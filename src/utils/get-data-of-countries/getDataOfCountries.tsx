import React from "react";
import {client} from "../../apollo-graphql/client";
import {LIST_COUNTRIES} from "../../apollo-graphql/query";
import {DataOfCountriesTypes} from "../../../types/types";
import './getDataOfCountries.css';

export async function getDataOfCountries(): Promise<DataOfCountriesTypes[]> {
    const {data} = await client.query({
        query: LIST_COUNTRIES
    });

    let countries = [];
    const countriesData = data.countries;
    for (let country in countriesData) {
        countries.push(
            {
                key: countriesData[country].code,
                name: countriesData[country].name,
                code: countriesData[country].code,
                continent: countriesData[country].continent,
                emoji: <img alt='Flag'
                            className='flag'
                            src={require('../../flags-svg/'
                                .concat(countriesData[country].code
                                .toLowerCase()
                                .concat('.svg'))).default}
                        />
            }
        )
    }
    return countries;
}