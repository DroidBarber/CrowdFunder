import { Placement, Boundary, ComputePositionReturn, ComputePositionConfig, VirtualElement } from '@floating-ui/dom';
export { Placement } from '@floating-ui/dom';

declare type AutoUpdateOptions = {
    ancestorScroll?: boolean;
    ancestorResize?: boolean;
    referenceResize?: boolean;
};

declare type PositioningOptions = {
    /**
     * The strategy to use for positioning
     */
    strategy?: "absolute" | "fixed";
    /**
     * The initial placement of the floating element
     */
    placement?: Placement;
    /**
     * The offset of the floating element
     */
    offset?: {
        mainAxis?: number;
        crossAxis?: number;
    };
    /**
     * The main axis offset or gap between the reference and floating elements
     */
    gutter?: number;
    /**
     * The virtual padding around the viewport edges to check for overflow
     */
    overflowPadding?: number;
    /**
     * Whether to flip the placement
     */
    flip?: boolean;
    /**
     * Whether the floating element can overlap the reference element
     * @default false
     */
    overlap?: boolean;
    /**
     * Whether to make the floating element same width as the reference element
     */
    sameWidth?: boolean;
    /**
     * Whether the popover should fit the viewport.
     */
    fitViewport?: boolean;
    /**
     * The overflow boundary of the reference element
     */
    boundary?: Boundary;
    /**
     * Options to activate auto-update listeners
     */
    listeners?: boolean | AutoUpdateOptions;
    /**
     * Function called when the placement is computed
     */
    onComplete?(data: ComputePositionReturn & {
        compute: (config?: Omit<ComputePositionConfig, "platform">) => void;
    }): void;
    /**
     * Function called on cleanup of all listeners
     */
    onCleanup?: VoidFunction;
};
declare type BasePlacement = "top" | "right" | "bottom" | "left";

declare function getPlacement(reference: HTMLElement | VirtualElement | null, floating: HTMLElement | null, opts?: PositioningOptions): (() => void) | undefined;
declare function getBasePlacement(placement: Placement): BasePlacement;

declare type Options = {
    measured: boolean;
    strategy?: "absolute" | "fixed";
    placement?: Placement;
};
declare function getPlacementStyles(options: Options): {
    arrow: {
        readonly [x: string]: string | 0 | undefined;
        readonly position: "absolute";
        readonly width: string;
        readonly height: string;
        readonly opacity: 0 | undefined;
    };
    innerArrow: {
        readonly transform: any;
        readonly background: string;
        readonly top: "0";
        readonly left: "0";
        readonly width: "100%";
        readonly height: "100%";
        readonly position: "absolute";
        readonly zIndex: "inherit";
    };
    floating: {
        position: "absolute" | "fixed";
        readonly top?: 0 | undefined;
        readonly left?: 0 | undefined;
        readonly opacity?: 0 | undefined;
        readonly transform?: "translate3d(0, -200%, 0)" | undefined;
        readonly pointerEvents?: "none" | undefined;
        readonly minWidth: "max-content";
    };
};

export { PositioningOptions, getBasePlacement, getPlacement, getPlacementStyles };
