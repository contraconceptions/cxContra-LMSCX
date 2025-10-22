import type { Module, Lesson, LessonSection } from '../content/types';

export interface OfflineModuleData {
  moduleId: string;
  module: Module;
  downloadedAt: number;
  version: string;
  size: number;
}

export interface OfflineStorage {
  modules: OfflineModuleData[];
  lastSync: number;
}

class OfflineManager {
  private dbName = 'CXMasterclassOffline';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create modules store
        if (!db.objectStoreNames.contains('modules')) {
          const modulesStore = db.createObjectStore('modules', { keyPath: 'moduleId' });
          modulesStore.createIndex('downloadedAt', 'downloadedAt', { unique: false });
        }

        // Create content store for lesson sections
        if (!db.objectStoreNames.contains('content')) {
          const contentStore = db.createObjectStore('content', { keyPath: 'id' });
          contentStore.createIndex('moduleId', 'moduleId', { unique: false });
          contentStore.createIndex('lessonId', 'lessonId', { unique: false });
        }
      };
    });
  }

  async downloadModule(module: Module): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['modules', 'content'], 'readwrite');
    const modulesStore = transaction.objectStore('modules');
    const contentStore = transaction.objectStore('content');

    // Calculate size estimate
    const size = this.calculateModuleSize(module);

    const offlineModule: OfflineModuleData = {
      moduleId: module.id,
      module,
      downloadedAt: Date.now(),
      version: '1.0.0',
      size
    };

    // Store module metadata
    await new Promise<void>((resolve, reject) => {
      const request = modulesStore.put(offlineModule);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Store all lesson content
    for (const lesson of module.lessons) {
      for (const section of lesson.sections) {
        const contentItem = {
          id: `${module.id}-${lesson.id}-${section.id}`,
          moduleId: module.id,
          lessonId: lesson.id,
          sectionId: section.id,
          content: section,
          downloadedAt: Date.now()
        };

        await new Promise<void>((resolve, reject) => {
          const request = contentStore.put(contentItem);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    }
  }

  async removeModule(moduleId: string): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['modules', 'content'], 'readwrite');
    const modulesStore = transaction.objectStore('modules');
    const contentStore = transaction.objectStore('content');

    // Remove module metadata
    await new Promise<void>((resolve, reject) => {
      const request = modulesStore.delete(moduleId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Remove all content for this module
    const contentIndex = contentStore.index('moduleId');
    const contentRequest = contentIndex.openCursor(IDBKeyRange.only(moduleId));
    
    contentRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  }

  async getOfflineModules(): Promise<OfflineModuleData[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['modules'], 'readonly');
      const store = transaction.objectStore('modules');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async isModuleAvailable(moduleId: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['modules'], 'readonly');
      const store = transaction.objectStore('modules');
      const request = store.get(moduleId);

      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getModuleContent(moduleId: string): Promise<Module | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['modules'], 'readonly');
      const store = transaction.objectStore('modules');
      const request = store.get(moduleId);

      request.onsuccess = () => {
        const offlineModule = request.result;
        resolve(offlineModule ? offlineModule.module : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getStorageUsage(): Promise<{ used: number; total: number }> {
    if (!this.db) await this.init();

    const modules = await this.getOfflineModules();
    const used = modules.reduce((sum, module) => sum + module.size, 0);
    const total = 50 * 1024 * 1024; // 50MB limit

    return { used, total };
  }

  private calculateModuleSize(module: Module): number {
    // Rough estimation of module size
    let size = 0;
    
    // Base module metadata
    size += JSON.stringify(module).length;
    
    // Add estimated size for each lesson
    for (const lesson of module.lessons) {
      size += lesson.sections.length * 1024; // 1KB per section estimate
    }
    
    return size;
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['modules', 'content'], 'readwrite');
    const modulesStore = transaction.objectStore('modules');
    const contentStore = transaction.objectStore('content');

    await Promise.all([
      new Promise<void>((resolve, reject) => {
        const request = modulesStore.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      }),
      new Promise<void>((resolve, reject) => {
        const request = contentStore.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      })
    ]);
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager();

// Utility functions
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getStoragePercentage = (used: number, total: number): number => {
  return Math.round((used / total) * 100);
};

export const isStorageAvailable = (used: number, total: number, requiredSize: number): boolean => {
  return (used + requiredSize) <= total;
};
