interface ToLiteKType<T> {
  [name: string]: {
    meta: {
      en: T;
    };
  };
}

export function toLite<T, K extends ToLiteKType<T>>(payload: K): T {
  const entityKey = Object.keys(payload)[0];
  return (payload[entityKey] as { meta: { en: T } }).meta.en;
}
