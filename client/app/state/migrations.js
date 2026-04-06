export function runMigrations(state) {
  return {
    version: 1,
    ...(state || {}),
  };
}
