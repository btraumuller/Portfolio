"use client"

import './css/imageGallery.css';
import GalleryListings from './components/galleryListings';
import { useId } from 'react';
import Select, { SelectInstance } from 'react-select';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'; 
import { useEffect, useReducer, useState, useRef } from 'react';
import axios from 'axios';

type actionType = {
    type:string,
    data:{
        data: {
            total:number;
            results:[];
        },
        dataType:string;
    }
}

type tabs = {
    value: string;
    active: boolean;
}[];

type initialDataStateType = {
    tabFilters: [string];
    filterTags: tabs;
    dropdownFilters: [string];
    designStyleTags: tabs;
    projectList: [];
    cardsLoaded: number;
    hideList: boolean;
    totalResultsLabel: string;
}

type dataAPIObject = {
    data: {
        total:number;
        results:[];
    },
    dataType:string;
}

const API_KEY = process.env.NEXT_PUBLIC_SPLASH_API_KEY

const SplideOptions = {
    gap: '3rem',
    perPage: 8,
    perMove:8,
    pagination: false,
    isNavigation: true,
    rewind: false,
}

const Labels = {
    noResultsLabel: 'There are no results to display',
    LoadMoreLabel: 'load more',
    viewDetailsLabel: 'Details',
    cardHoverLabel: 'See more',
    totalResultsLabel: 'Results',
}

let booleanStates = {
    initialLoad: true,
    isLoading: false,
    allCards: true,
    isNoResults: false,
    getPreviousCards: false
}

let initialDataState = {
    tabFilters: [
        "photos",
        "collections"
    ],
    filterTags:[],
    dropdownFilters: [
        "Basement",
        "Bathroom",
        "Bedroom",
        "Commercial",
        "Dining Room",
        "Entertainment",
        "Kids Room",
        "Kitchen",
        "Laundry",
        "Living Room",
        "Media Room",
        "Office",
        "Outdoor",
        "Product Focus"
    ],
    designStyleTags:[],
    projectList:[],
    cardsLoaded: 0,
    hideList: true,
    totalResultsLabel: '',
}

let urlSelections = {
    roomSelection: '',
    designSelection: '',
    page: 1,
    callType: 'initial',
}

function objectGenerator(type:string, data:[string]){
    let Selections = data,
        selection:string,
        selectionsIdArray = [];
    for (selection of Selections){
        let selectionId:string;
        let option:{} = {}
        if ((/\s/).test(selection)){
            selectionId = selection.replace(/\s+/g, '%20').toLowerCase();
        }else{
            selectionId = selection.toLowerCase();
        }
        if (type = 'tab'){
            let isActive;
            option = {
                value: selectionId,
                label: selection,
                active: isActive

            }
        }else if (type = 'dropdown'){
            option = {
                value: selectionId,
                label: selection,

            }
        }

        selectionsIdArray.push(option);
    }

    return selectionsIdArray
}

function getProjectList(newprojectListData:[], currentProjectListData:[], callType:string, dataType:string){
    
    type ProjectCard = {
        Name:string;
        ImageSrc: string;
        Link: string;
    }

    type ProjectData = {
        alt_description: string;
        urls: {
            thumb: string;
            regular: string;
        };
        cover_photo: {
            description: string;
            urls: {
                thumb: string;
                regular: string;
            }
            links:{
                html:string
            }
        }
    }

    let projectList:ProjectCard[] = [],
        hideList:boolean = true; 
     
    if (callType === 'initial'){
        projectList = [];
    }else{
        projectList = currentProjectListData;
    }

    if(newprojectListData.length > 0){

        let cardName:string, cardImageSrc:string, cardLink:string;

        newprojectListData.forEach((project:ProjectData) => {

            switch(dataType){
                case('photos'):
                    cardName = project.alt_description;
                    cardImageSrc = project.urls.thumb;
                    cardLink = project.urls.regular;
                    break;
                case('collections'):
                    cardName = project.cover_photo.description;
                    cardImageSrc = project.cover_photo.urls.thumb;
                    cardLink = project.cover_photo.links.html;
                    break;
                default:
                    cardName = project.alt_description;
                    cardImageSrc = project.urls.thumb;
                    cardLink = project.urls.regular;
                    break;
            }

            let card: ProjectCard = {
                Name: cardName,
                ImageSrc: cardImageSrc,
                Link: cardLink
            }
            
            projectList.push(card);
            
        });

        hideList = false;
    }else{
        let emptyCard = {
            Name:'',
            ImageSrc:'',
            Link:'',
        };
        hideList = true;
        projectList.push(emptyCard);
        
    }
    let cardsCounted= projectList.length;
    return([projectList, hideList, cardsCounted]);
}



function getData(state: any , action: actionType){

    let total:number = Number(action.data.data.total);
    let totalResults:string = action.data.data.total + ' '+ Labels.totalResultsLabel;
    let [projectListData, hideListBoolean , cardsCounted] = getProjectList(action.data.data.results, state.projectList, action.type, action.data.dataType); 
    let cardCount:number = Number(cardsCounted);
    let isAllLoaded:boolean = (total <= cardCount) ? false : true;

    switch(action.type){
        
        case 'initial':
            return{
                tabFilters: state.tabFilters,
                filterTags: objectGenerator('tab', state.tabFilters),
                dropdownFilters: state.dropdownFilters,
                designStyleTags: objectGenerator('dropdown', state.dropdownFilters),
                projectList: projectListData,
                hideList: hideListBoolean,
                totalResultsLabel: totalResults,
                cardsLoaded: cardCount,
                showLoadMore: true
            };
        case 'LoadMore':
                return{
                    tabFilters: state.tabFilters,
                    filterTags: state.filterTags,
                    designStyleTags: state.designStyleTags,
                    dropdownFilters: state.dropdownFilters,
                    projectList: projectListData,
                    hideList: hideListBoolean,
                    totalResultsLabel: totalResults,
                    cardsLoaded: cardCount,
                    showLoadMore: isAllLoaded   
                }
        case 'Error':
            return{
                noResultsLabel:"There is something wrong. Please try again later",
            };
        default: return state;
    }
    
}

function setActiveSlide(initialLoad:boolean, tabFilters:[], roomSelection:string){ 

    if (!initialLoad){

        let tabs:tabs = tabFilters;

        for(let tab of tabs){
            if(tab.value === roomSelection){
                tab.active = true;
            }else{
                tab.active = false;
            }
        }
    }
}

export default function ImageGallery({}:{
}){
    const SplideRef = useRef();
    const SelectRef = useRef<SelectInstance | null>(null);
    const [BooleanValues, setBooleanValues] = useState(booleanStates);
    const [Selections, setSelections] = useState(urlSelections);
    const [DataState, retrieveData] = useReducer(getData, initialDataState);
    const [CallEffect, setCallEffect] = useState(false);
    const SearchParam = useSearchParams();
    const {replace} = useRouter();
    const PathName = usePathname();
    
    const SelectAction = (eventValue: string | {value:string}, categoryType:string) => {

        let selectValue:string = (typeof eventValue === 'string')? eventValue : eventValue.value;
        let urlParams = new URLSearchParams(SearchParam);
    
        if (categoryType === "Room"){
            
            setSelections((prevState) => ({...prevState, roomSelection: selectValue, designSelection: Math.random.toString(), page: 1, callType: 'initial'}));
            urlParams.set('roomType', selectValue);
            
        }else{

            setSelections((prevState) => ({...prevState, designSelection: selectValue, page: 1, callType: 'initial'}));
            urlParams.set('designType', selectValue);
            
        }

        urlParams.set('currentCards', '10');

        replace(`${PathName}?${urlParams.toString()}`, {scroll: false});

        setCallEffect(!CallEffect);

    }

    const LoadMore = () => {

        let urlParams = new URLSearchParams(SearchParam);

        let totalCardsLoaded = DataState.cardsLoaded + 10;

        setSelections((prevState) => ({...prevState, page: Selections.page + 1, callType: 'LoadMore'}));

        urlParams.set('currentCards', totalCardsLoaded.toString());
        replace(`${PathName}?${urlParams.toString()}`, {scroll: false});

        setCallEffect(!CallEffect);
    }

    useEffect(() => {

        setBooleanValues((prevState) => ({...prevState, isLoading: true}));
        
        let urlRoom:string,
            urlQuery:string,
            urlCardCount:number,
            urlPage:number;

        if (BooleanValues.initialLoad){

            const RoomTypeParam = SearchParam.get("roomType");
            const StyleTypeParam = SearchParam.get("designType");
            const CurrentCards = SearchParam.get("currentCards");

            urlRoom = (RoomTypeParam) ? RoomTypeParam : DataState.tabFilters[0];
            urlCardCount = (CurrentCards) ? parseInt(CurrentCards) : 10;
            urlQuery= (StyleTypeParam) ? StyleTypeParam : Math.random.toString();
            urlPage = Selections.page;

            setSelections((prevState) => ({...prevState, roomSelection: urlRoom, designSelection: urlQuery, currentCards: urlCardCount}));

        }else{
            urlRoom = Selections.roomSelection;
            urlQuery = Selections.designSelection;
            urlPage = Selections.page,
            urlCardCount = 10;
        }

        if (Selections.roomSelection !== ''){     

            let api = `https://api.unsplash.com/search/${urlRoom}?client_id=${API_KEY}&page=${urlPage}&per_page=${urlCardCount}&query=${urlQuery}`;
            
            axios.get(api)
                .then(response =>{

                    // retrieve and sort Data
                    if(response.data.total === 0){
                        setBooleanValues((prevState) => ({...prevState, isNoResults: true}));
                    }else{

                        let dataObject:dataAPIObject = {
                            data: response.data,
                            dataType: Selections.roomSelection
                        }

                        retrieveData({
                            type: Selections.callType, 
                            data: dataObject
                        });
                        
                        setBooleanValues((prevState) => ({...prevState, isNoResults: false}));
                    }

                }).catch(error => {
                    retrieveData({type: 'Error', data: { data: { total: 0, results: [] }, dataType: '' }});
                });

                setBooleanValues((prevState) => ({...prevState, initialLoad: false, isLoading: false}));
            }
              
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ Selections.designSelection, Selections.roomSelection, CallEffect]);
    
    setActiveSlide(BooleanValues.initialLoad, DataState.filterTags, Selections.roomSelection);

    return(
        <div className='project-gallery'>
            <div className="project-gallery__filters">
                    { !BooleanValues.initialLoad &&
                    <Splide className="nav nav-tabs splide__list" role="tablist" options={SplideOptions} ref={SplideRef}>
                        {
                            DataState.filterTags.map((tab:{active:boolean, value:string, label:string}, i:number) =>
                                <SplideSlide  
                                    key={i}  
                                    role="presentation" 
                                    className="splide__slide">
                                        <button 
                                            className={(tab.active ? 'active' : '')} 
                                            onClick={() => SelectAction(tab.value, 'Room')} 
                                            type="button" >
                                                    {tab.label}
                                            </button>
                                </SplideSlide>
                            )
                        }
                    </Splide>
                    }
                </div>

                <Select 
                    options={DataState.filterTags} 
                    isSearchable={false} 
                    value={DataState.filterTags.filter((option:{value:string}) => option.value === Selections.roomSelection)}
                    placeholder="Select Room" 
                    className="select-dropdown-container mobile-filter" 
                    classNamePrefix="select-dropdown" 
                    onChange={(e) => SelectAction(e, 'Room')} />
                
                <p className="project-gallery__counter">{DataState.totalResultsLabel}</p>

                <Select 
                    options={DataState.designStyleTags}
                    value={DataState.designStyleTags.filter((option:{value:string}) => option.value === Selections.designSelection)} 
                    placeholder="Select Styles" 
                    isSearchable={false} 
                    className="select-dropdown-container" 
                    classNamePrefix="select-dropdown" 
                    onChange={(e:any) => SelectAction(e , 'Design')}
                    instanceId={useId()}
                    ref={SelectRef}
                />
                
                <GalleryListings 
                    hideList={DataState.hideList} 
                    projectContent={DataState.projectList} 
                    loadMoreAction={LoadMore} 
                    loadMoreLabel={Labels.LoadMoreLabel} 
                    hoverLabel={Labels.cardHoverLabel} 
                    showLoadMore={BooleanValues.allCards} 
                    noResults={Labels.noResultsLabel} 
                    isNoResults={BooleanValues.isNoResults} 
                    isLoading={BooleanValues.isLoading}  
                />
                
        </div>
        
    )
}