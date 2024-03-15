import { ReactElement } from "react";

export interface Bento3 {
    childHeader: ReactElement | undefined,
    childMain: ReactElement | undefined,
    childRight: ReactElement | undefined,
    isBurgerMenu: boolean,
    isSVGRequired: boolean,
}