declare type InteractOutsideHandlers = {
    onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
    onFocusOutside?: (event: FocusOutsideEvent) => void;
    onInteractOutside?: (event: InteractOutsideEvent) => void;
};
declare type InteractOutsideOptions = InteractOutsideHandlers & {
    exclude?: (target: HTMLElement) => boolean;
};
declare type EventDetails<T> = {
    originalEvent: T;
    contextmenu: boolean;
    focusable: boolean;
};
declare type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>;
declare type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>;
declare type InteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent;
declare function trackInteractOutside(node: HTMLElement | null, options: InteractOutsideOptions): (() => void) | undefined;

export { FocusOutsideEvent, InteractOutsideEvent, InteractOutsideHandlers, InteractOutsideOptions, PointerDownOutsideEvent, trackInteractOutside };
