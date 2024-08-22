export type SplideOptionTypes = {
    gap: string,
    perPage: number,
    perMove:number,
    pagination: boolean,
    isNavigation: boolean,
    rewind: boolean,
}
export type URLSelectionsType = {
    roomSelection: string,
    designSelection: string,
    page: number,
    callType: string,
    mobileLoad:number,
    desktopLoad:number
}

export type ActionType = {
    type:string,
    data:{
        data: {
            total:number;
            results:[];
        },
        dataType:string;
    }
}

export type TabsType = {
    value: string;
    active: boolean;
}[];

export type DataAPIObjectType = {
    data: {
        total:number;
        results:[];
    },
    dataType:string;
}

export type OptionType = {
    value:string;
    label:string;
    active?:boolean;
}

export type ProjectListType = {
    Name:string;
    ImageSrc:string;
    Link:string;
}
export type LabelTypes = {
    noResultsLabel: string,
    loadMoreLabel: string,
    viewDetailsLabel: string,
    cardHoverLabel: string,
    totalResultsLabel: string,
    loadingLabel: string,
}
export type BooleanStateTypes ={
    initialLoad: boolean,
    isLoading: boolean,
    allCards: boolean,
    isNoResults: boolean,
}

// Gallery Listings Type

export type galleryListData = {
    isLoading:boolean,
    hideList:boolean,
    showLoadMore:boolean,
    isNoResults:boolean,
    hoverLabel:string,
    noResults:string,
    loadMoreLabel:string,
    isLoadingLabel:string,
    loadMoreAction:() => void,
    projectContent:{
        Link:string,
        ImageSrc:string,
        Name:string
    }[],
}