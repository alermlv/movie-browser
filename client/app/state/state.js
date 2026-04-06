let state = createInitialState();
const listeners = new Set();

export function createInitialState() {
  return {
    version: 1,

    route: {
      name: "home",
      params: {},
      query: {},
    },

    home: {
      sections: {},
    },

    search: {
      totalPages: 0,
      totalResults: 0,
      items: [],
    },

    details: {
      item: null,
    },

    genres: {
      byType: {
        movie: {},
        tv: {},
      },
    },

    favorites: {
      keys: [],
    },

    searchHistory: [],

    ui: {
      isHydrated: false,
      isLoading: false,
      error: null,
      notice: null,
      activeDialog: null,
      searchDraft: "",
    },
  };
}

export function getState() {
  return state;
}

export function subscribe(listener) {
  listeners.add(listener);

  return function unsubscribe() {
    listeners.delete(listener);
  };
}

export function commitState(updater) {
  const nextState = updater(state);
  state = nextState;
  listeners.forEach((listener) => listener(state));
}
