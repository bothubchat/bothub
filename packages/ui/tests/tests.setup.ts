import '@testing-library/jest-dom/vitest';
import { FakeFinalizationRegistry } from '../src/tests/finalization-registry';

// Сборку мусора тесты вызывают сами: collectGarbage из @/ui/tests
globalThis.FinalizationRegistry =
  FakeFinalizationRegistry as unknown as FinalizationRegistryConstructor;
