import React, {createRef} from 'react';
import "./styles/Countries.css";
import {Button, Input, Space, Table} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {getDataOfCountries} from "../../utils/get-data-of-countries/getDataOfCountries";
import {CountriesState, CountriesTypes, FilterDropdownProps} from "../../../types/types";
import {FilterConfirmProps} from "antd/lib/table/interface";
import {
    buttonFilterResetSearch,
    buttonFilterSearch,
    colorOfSearchIcon,
    filterSearchContainer,
    highlighter,
    inputSearch,
    loader
} from "./styles/Countries";

export class Countries extends React.Component<any, CountriesState> {

    private searchInput = createRef<Input>();

    state: CountriesState = {
        searchText: '',
        searchedColumn: '',
        initialized: false,
        dataOfCountries: []
    };

    async componentDidMount(): Promise<void> {
        const dataOfCountries = await getDataOfCountries()
        this.setState({
            initialized: true,
            dataOfCountries: dataOfCountries
        });
    }

    private getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterDropdownProps): React.ReactNode => (
            <div style={filterSearchContainer}>
                <Input
                    ref={this.searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={inputSearch}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={buttonFilterSearch}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={buttonFilterResetSearch}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean): React.ReactNode => <SearchOutlined
            style={{color: filtered ? colorOfSearchIcon : undefined}}/>,
        onFilter: (value: string, record: any): boolean =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: boolean): void => {
            if (visible) {
                setTimeout(() => this.searchInput.current?.select(), 100);
            }
        },
        render: (text: string): React.ReactNode =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={highlighter}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    private handleSearch = (selectedKeys: React.Key[], confirm: (param?: FilterConfirmProps) => void,
                            dataIndex: string): void => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    private handleReset = (clearFilters?: () => void): void => {
        if (clearFilters) {
            clearFilters();
        }
        this.setState({searchText: ''});
    };

    private getColumns = () => {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: (a: CountriesTypes, b: CountriesTypes): number => a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('name'),
            },

            {
                title: 'ISO Code',
                dataIndex: 'code',
                sorter: (a: CountriesTypes, b: CountriesTypes): number => a.code < b.code ? -1 : a.code > b.code ? 1 : 0,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('code'),
            },

            {
                title: 'Continent',
                dataIndex: ['continent', 'name'],
                filters: [
                    {
                        text: 'Europe',
                        value: 'Europe',
                    },
                    {
                        text: 'Asia',
                        value: 'Asia',
                    },
                    {
                        text: 'North America',
                        value: 'North America',
                    },
                    {
                        text: 'South America',
                        value: 'South America',
                    },
                    {
                        text: 'Africa',
                        value: 'Africa',
                    },
                    {
                        text: 'Antarctica',
                        value: 'Antarctica',
                    },
                    {
                        text: 'Oceania',
                        value: 'Oceania',
                    },
                ],
                onFilter: (value: string | number | boolean, record: any): boolean =>
                    record.continent.name.indexOf(value) === 0,
                sorter: (a: CountriesTypes, b: CountriesTypes): number => a.continent.name < b.continent.name ? -1 :
                    a.continent.name > b.continent.name ? 1 : 0,
                sortDirections: ['descend', 'ascend'],
            },

            {
                title: 'Flag',
                dataIndex: 'emoji',
            },
        ];
    }

    render(): React.ReactNode {
        if (!this.state.initialized) {
            return (
                <div className='loaderContainer'>
                    <LoadingOutlined style={loader}/>
                </div>
            )
        }

        return (
            <div className='tableContainer'>
                <Table columns={this.getColumns() as any} dataSource={this.state.dataOfCountries} bordered/>
            </div>
        )
    }
}