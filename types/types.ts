import React from "react";
import {FilterConfirmProps} from "antd/lib/table/interface";

export interface FilterDropdownProps {
    setSelectedKeys: (selectedKeys: React.Key[]) => void,
    selectedKeys: React.Key[],
    confirm: (param?: FilterConfirmProps) => void,
    clearFilters?: () => void,
}

export interface CountriesState {
    searchText: any,
    searchedColumn: string,
    initialized: boolean,
    dataOfCountries: {}[]
}

export interface CountriesTypes {
    name: string,
    code: string,
    continent: Continent,
    emoji: string,
}

export interface Continent {
    name: string
}

export interface DataOfCountriesTypes {
    key: string,
    name: string,
    code: string,
    continent: string,
    emoji: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}