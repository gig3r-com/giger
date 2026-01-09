import type { ComponentType } from 'react';
import { useTenant } from '../shared/providers/tenant.provider';
import { NewGig as NewGigGiger } from '../apps/giger/new-gig/new-gig-giger';
import { NewGig as NewGigCoc } from '../apps/giger/new-gig/new-gig-coc';
import { Gig as GigGiger } from '../apps/giger/gig/gig.giger';
import { Gig as GigCoc } from '../apps/giger/gig/gig.coc';
import { GigHeader as GigHeaderGig } from '../apps/giger/gig/gig-header/gig-header.giger';
import { GigHeader as GigHeaderCoc } from '../apps/giger/gig/gig-header/gig-header.coc';
import { IGigHeaderProps } from '../apps/giger/gig/gig-header/gig-header.model';
import { IGigProps } from '../apps/giger/gig/gig.model';
import { INewGigProps } from '../apps/giger/new-gig/new-gig.model';
import { GigBody as GigBodyGiger } from '../apps/giger/gig/gig-body/gig-body.giger';
import { GigBody as GigBodyCoc } from '../apps/giger/gig/gig-body/gig-body.coc';
import { IGigBodyProps } from '../apps/giger/gig/gig-body/gig-body.model';
import { MainMenu as MainMenuCoc } from '../shared/components/main-menu/main-menu.coc';
import { MainMenu as MainMenuGiger } from '../shared/components/main-menu/main-menu.giger';
import { CharSummary as CharSummaryGiger } from '../apps/myId/char-summary/char-summary.giger';
import { CharSummary as CharSummaryCoc } from '../apps/myId/char-summary/char-summary.coc';
import { ICharSummaryProps } from '../apps/myId/char-summary/char-summary.model';
import { MyIdNavigationProps } from '../apps/myId/myid.model';
import { MyIdNavigation as MyIdNavigationCoc } from '../apps/myId/my-id-navigation/my-id-navigation.coc';
import { MyIdNavigation as MyIdNavigationGiger } from '../apps/myId/my-id-navigation/my-id-navigation.giger';

type Registry = {
    NewGig: ComponentType<INewGigProps>;
    Gig: ComponentType<IGigProps>;
    GigHeader: ComponentType<IGigHeaderProps>;
    GigBody: ComponentType<IGigBodyProps>;
    MainMenu: ComponentType;
    CharSummary: ComponentType<ICharSummaryProps>;
    MyIdNavigation: ComponentType<MyIdNavigationProps>;
};

const gigerReg: Registry = {
    NewGig: NewGigGiger,
    Gig: GigGiger,
    GigHeader: GigHeaderGig,
    GigBody: GigBodyGiger,
    MainMenu: MainMenuGiger,
    CharSummary: CharSummaryGiger,
    MyIdNavigation: MyIdNavigationGiger
};

const cocReg: Registry = {
    NewGig: NewGigCoc,
    Gig: GigCoc,
    GigHeader: GigHeaderCoc,
    GigBody: GigBodyCoc,
    MainMenu: MainMenuCoc,
    CharSummary: CharSummaryCoc,
    MyIdNavigation: MyIdNavigationCoc
};

const registries = {
    gigerDefault: gigerReg,
    cityOfChange: cocReg
} as const;

export function useRegistry(): Registry {
    const id = useTenant();
    return registries[id] ?? gigerReg;
}
