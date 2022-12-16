import { InteractOutsideHandlers } from '@zag-js/interact-outside';

declare type Container = HTMLElement | null | Array<HTMLElement | null>;
declare type DismissableElementHandlers = InteractOutsideHandlers & {
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
};
declare type DismissableElementOptions = DismissableElementHandlers & {
    debug?: boolean;
    pointerBlocking?: boolean;
    onDismiss: () => void;
    exclude?: Container | (() => Container);
};
declare function trackDismissableElement(node: HTMLElement | null, options: DismissableElementOptions): (() => void) | undefined;

export { DismissableElementHandlers, DismissableElementOptions, trackDismissableElement };
