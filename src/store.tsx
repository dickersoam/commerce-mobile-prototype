import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import { PRIMARY_DEAL, QUOTES, NOTIFICATIONS } from "./data";

export type ScreenKey =
  | "home"
  | "searchResults"
  | "dealDetails"
  | "bom"
  | "lineDiscount"
  | "submit"
  | "submitted"
  | "decision"
  | "quotes"
  | "quoteResult"
  | "notifications"
  | "profile"
  | "proxyChoose"
  | "proxyDelegate"
  | "proxyTeam"
  | "proxyActing";

export type ActingKind = "colleague" | "team";

export type ModalKey =
  | "quoteDetails"
  | "filter"
  | "sort"
  | "approveConfirm"
  | "disapproveConfirm"
  | null;

export interface LineEdit {
  discountPct: number;
  netExt: number;
}

interface State {
  authed: boolean;
  stack: { screen: ScreenKey; params?: Record<string, any> }[];
  modal: ModalKey;
  modalParams: Record<string, any>;
  activeDealId: string;
  searchQuery: string;
  lineEdits: Record<string, LineEdit>; // lineId -> edit
  categoryEdits: Record<string, number>; // category -> pct
  submitted: boolean;
  readIds: string[];
  actingAs: string | null;
  actingKind: ActingKind | null;
  voiceOpen: boolean;
  toast: string | null;
}

type Action =
  | { type: "NAV"; screen: ScreenKey; params?: Record<string, any> }
  | { type: "BACK" }
  | { type: "RESET"; screen: ScreenKey }
  | { type: "OPEN_MODAL"; modal: ModalKey; params?: Record<string, any> }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_QUERY"; q: string }
  | { type: "EDIT_LINE"; lineId: string; edit: LineEdit }
  | { type: "EDIT_CATEGORY"; category: string; pct: number }
  | { type: "SET_SUBMITTED"; v: boolean }
  | { type: "MARK_ALL_READ" }
  | { type: "SET_ACTING"; who: string | null; kind?: ActingKind }
  | { type: "VOICE"; open: boolean }
  | { type: "TOAST"; msg: string | null }
  | { type: "SIGN_IN" }
  | { type: "SIGN_OUT" };

const initial: State = {
  authed: true,
  stack: [{ screen: "home" }],
  modal: null,
  modalParams: {},
  activeDealId: PRIMARY_DEAL.dealId,
  searchQuery: "",
  lineEdits: {},
  categoryEdits: {},
  submitted: false,
  readIds: [],
  actingAs: null,
  actingKind: null,
  voiceOpen: false,
  toast: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NAV":
      return {
        ...state,
        activeDealId: action.params?.dealId ?? state.activeDealId,
        stack: [...state.stack, { screen: action.screen, params: action.params }],
        modal: null,
      };
    case "BACK":
      return {
        ...state,
        stack:
          state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack,
        modal: null,
      };
    case "RESET":
      return { ...state, stack: [{ screen: action.screen }], modal: null };
    case "OPEN_MODAL":
      return { ...state, modal: action.modal, modalParams: action.params ?? {} };
    case "CLOSE_MODAL":
      return { ...state, modal: null };
    case "SET_QUERY":
      return { ...state, searchQuery: action.q };
    case "EDIT_LINE":
      return {
        ...state,
        lineEdits: { ...state.lineEdits, [action.lineId]: action.edit },
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categoryEdits: {
          ...state.categoryEdits,
          [action.category]: action.pct,
        },
      };
    case "SET_SUBMITTED":
      return { ...state, submitted: action.v };
    case "MARK_ALL_READ":
      return { ...state, readIds: NOTIFICATIONS.map((n) => n.id) };
    case "SET_ACTING":
      return {
        ...state,
        actingAs: action.who,
        actingKind: action.who ? action.kind ?? "colleague" : null,
      };
    case "VOICE":
      return { ...state, voiceOpen: action.open };
    case "TOAST":
      return { ...state, toast: action.msg };
    case "SIGN_IN":
      return { ...state, authed: true, stack: [{ screen: "home" }], modal: null, voiceOpen: false };
    case "SIGN_OUT":
      return { ...state, authed: false, stack: [{ screen: "home" }], modal: null, voiceOpen: false };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  current: { screen: ScreenKey; params?: Record<string, any> };
  nav: (screen: ScreenKey, params?: Record<string, any>) => void;
  back: () => void;
  reset: (screen: ScreenKey) => void;
  openModal: (modal: ModalKey, params?: Record<string, any>) => void;
  closeModal: () => void;
  setQuery: (q: string) => void;
  editLine: (lineId: string, edit: LineEdit) => void;
  editCategory: (category: string, pct: number) => void;
  setSubmitted: (v: boolean) => void;
  markAllRead: () => void;
  setActing: (who: string | null, kind?: ActingKind) => void;
  setVoice: (open: boolean) => void;
  toast: (msg: string) => void;
  signIn: () => void;
  signOut: () => void;
  activeQuote: typeof QUOTES[number];
}

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const nav = useCallback(
    (screen: ScreenKey, params?: Record<string, any>) =>
      dispatch({ type: "NAV", screen, params }),
    []
  );
  const back = useCallback(() => dispatch({ type: "BACK" }), []);
  const reset = useCallback(
    (screen: ScreenKey) => dispatch({ type: "RESET", screen }),
    []
  );
  const openModal = useCallback(
    (modal: ModalKey, params?: Record<string, any>) =>
      dispatch({ type: "OPEN_MODAL", modal, params }),
    []
  );
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const setQuery = useCallback(
    (q: string) => dispatch({ type: "SET_QUERY", q }),
    []
  );
  const editLine = useCallback(
    (lineId: string, edit: LineEdit) =>
      dispatch({ type: "EDIT_LINE", lineId, edit }),
    []
  );
  const editCategory = useCallback(
    (category: string, pct: number) =>
      dispatch({ type: "EDIT_CATEGORY", category, pct }),
    []
  );
  const setSubmitted = useCallback(
    (v: boolean) => dispatch({ type: "SET_SUBMITTED", v }),
    []
  );
  const markAllRead = useCallback(() => dispatch({ type: "MARK_ALL_READ" }), []);
  const setActing = useCallback(
    (who: string | null, kind?: ActingKind) =>
      dispatch({ type: "SET_ACTING", who, kind }),
    []
  );
  const setVoice = useCallback(
    (open: boolean) => dispatch({ type: "VOICE", open }),
    []
  );
  const toast = useCallback((msg: string) => {
    dispatch({ type: "TOAST", msg });
    window.setTimeout(() => dispatch({ type: "TOAST", msg: null }), 2200);
  }, []);
  const signIn = useCallback(() => dispatch({ type: "SIGN_IN" }), []);
  const signOut = useCallback(() => dispatch({ type: "SIGN_OUT" }), []);

  const current = state.stack[state.stack.length - 1];
  const selected =
    QUOTES.find((q) => q.dealId === state.activeDealId) ?? QUOTES[0];
  // BOM-context screens read `activeQuote`; deals without their own BOM data
  // fall back to the fully populated demo deal so every path stays testable.
  const activeQuote = selected.bom.length ? selected : PRIMARY_DEAL;

  const value = useMemo<Ctx>(
    () => ({
      state,
      current,
      nav,
      back,
      reset,
      openModal,
      closeModal,
      setQuery,
      editLine,
      editCategory,
      setSubmitted,
      markAllRead,
      setActing,
      setVoice,
      toast,
      signIn,
      signOut,
      activeQuote,
    }),
    [
      state,
      current,
      nav,
      back,
      reset,
      openModal,
      closeModal,
      setQuery,
      editLine,
      editCategory,
      setSubmitted,
      markAllRead,
      setActing,
      setVoice,
      toast,
      signIn,
      signOut,
      activeQuote,
    ]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
