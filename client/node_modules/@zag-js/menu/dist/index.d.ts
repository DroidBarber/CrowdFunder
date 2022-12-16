import { RequiredBy, DirectionProperty, CommonProperties, Context, PropTypes, NormalizeProps } from '@zag-js/types';
import * as _zag_js_core from '@zag-js/core';
import { StateMachine, Machine } from '@zag-js/core';
import { PositioningOptions } from '@zag-js/popper';
import { Point } from '@zag-js/rect-utils';

declare type ElementIds = Partial<{
    trigger: string;
    contextTrigger: string;
    content: string;
    label(id: string): string;
    group(id: string): string;
}>;
declare type PublicContext = DirectionProperty & CommonProperties & {
    /**
     * The ids of the elements in the menu. Useful for composition.
     */
    ids?: ElementIds;
    /**
     * The values of radios and checkboxes in the menu.
     */
    value?: Record<string, string | string[]>;
    /**
     * Callback to be called when the menu values change (for radios and checkboxes).
     */
    onValueChange?: (details: {
        name: string;
        value: string | string[];
    }) => void;
    /**
     * The `id` of the active menu item.
     */
    activeId: string | null;
    /**
     * Function called when a menu item is selected.
     */
    onSelect?: (value: string) => void;
    /**
     * The positioning point for the menu. Can be set by the context menu trigger or the button trigger.
     */
    anchorPoint: Point | null;
    /**
     * Whether to loop the keyboard navigation.
     */
    loop: boolean;
    /**
     * The options used to dynamically position the menu
     */
    positioning: PositioningOptions;
    /**
     * Whether to close the menu when an option is selected
     */
    closeOnSelect: boolean;
    /**
     * The accessibility label for the menu
     */
    "aria-label"?: string;
};
declare type UserDefinedContext = RequiredBy<PublicContext, "id">;
declare type ComputedContext = Readonly<{
    /**
     * @computed
     * Whether the menu is a submenu (has a parent menu)
     */
    readonly isSubmenu: boolean;
    /**
     * @computed
     * Whether the writing direction is rtl
     */
    readonly isRtl: boolean;
    /**
     * @computed
     * Whether a typeahead search is ongoing
     */
    readonly isTypingAhead: boolean;
}>;
declare type PrivateContext = Context<{}>;
declare type MachineContext = PublicContext & PrivateContext & ComputedContext;
declare type MachineState = {
    value: "unknown" | "idle" | "open" | "closed" | "opening" | "closing" | "opening:contextmenu";
    tags: "visible";
};
declare type State = StateMachine.State<MachineContext, MachineState>;
declare type Send = StateMachine.Send<StateMachine.AnyEventObject>;
declare type Service = Machine<MachineContext, MachineState>;
declare type Api = {
    getItemProps: (opts: ItemProps) => Record<string, any>;
    triggerProps: Record<string, any>;
};
declare type ItemProps = {
    /**
     * The `id` of the menu item option.
     */
    id: string;
    /**
     * Whether the menu item is disabled
     */
    disabled?: boolean;
    /**
     * The textual value of the option. Used in typeahead navigation of the menu.
     * If not provided, the text content of the menu item will be used.
     */
    valueText?: string;
    /**
     * Whether the menu should be closed when the option is selected.
     */
    closeOnSelect?: boolean;
};
declare type OptionItemProps = Partial<ItemProps> & {
    /**
     * The option's name as specified in menu's `context.values` object
     */
    name: string;
    /**
     * Whether the option is a radio or a checkbox
     */
    type: "radio" | "checkbox";
    /**
     * The value of the option
     */
    value: string;
    /**
     * Function called when the option state is changed
     */
    onCheckedChange?: (checked: boolean) => void;
};
declare type GroupProps = {
    /**
     * The `id` of the element that provides accessibility label to the option group
     */
    id: string;
};
declare type LabelProps = {
    /**
     * The `id` of the group this refers to
     */
    htmlFor: string;
};

declare function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>): {
    isOpen: boolean;
    open(): void;
    close(): void;
    activeId: string | null;
    setActiveId(id: string): void;
    setParent(parent: Service): void;
    setChild(child: Service): void;
    value: Record<string, string | string[]> | undefined;
    setValue(name: string, value: any): void;
    isOptionChecked(opts: OptionItemProps): boolean | undefined;
    contextTriggerProps: T["element"];
    getTriggerItemProps<A extends Api>(childApi: A): T["element"];
    triggerProps: T["button"];
    positionerProps: T["element"];
    arrowProps: T["element"];
    innerArrowProps: T["element"];
    contentProps: T["element"];
    separatorProps: T["element"];
    getItemProps(options: ItemProps): T["element"];
    getOptionItemProps(option: OptionItemProps): T["element"];
    getLabelProps(options: LabelProps): T["element"];
    getGroupProps(options: GroupProps): T["element"];
};

declare function machine(ctx: UserDefinedContext): _zag_js_core.Machine<MachineContext, MachineState, _zag_js_core.StateMachine.AnyEventObject>;

export { UserDefinedContext as Context, connect, machine };
