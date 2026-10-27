interface Registration {
  heldValue: unknown;
  token?: object;
}

/**
 * FinalizationRegistry, в котором объект «собирается» только по команде теста.
 * Настоящий сборщик мусора срабатывает когда угодно, и колбэк попадал бы
 * в чужой тест
 */
export class FakeFinalizationRegistry<T> {
  static instances: FakeFinalizationRegistry<unknown>[] = [];

  private readonly registrations = new Map<object, Registration>();

  constructor(private readonly cleanup: (heldValue: T) => void) {
    FakeFinalizationRegistry.instances.push(
      this as FakeFinalizationRegistry<unknown>,
    );
  }

  register(target: object, heldValue: T, token?: object) {
    this.registrations.set(target, { heldValue, token });
  }

  unregister(token: object): boolean {
    let removed = false;

    this.registrations.forEach((registration, target) => {
      if (registration.token === token) {
        this.registrations.delete(target);
        removed = true;
      }
    });

    return removed;
  }

  collect(target: object) {
    const registration = this.registrations.get(target);

    if (registration) {
      this.registrations.delete(target);
      this.cleanup(registration.heldValue as T);
    }
  }
}

/** Сборщик мусора собрал объект: колбэки всех реестров, где он записан */
export const collectGarbage = (target: object) => {
  FakeFinalizationRegistry.instances.forEach((registry) =>
    registry.collect(target),
  );
};
