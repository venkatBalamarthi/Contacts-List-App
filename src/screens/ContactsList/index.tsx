import React, {ReactNode, useCallback, useMemo, useState} from 'react'
import {View, FlatList, Text, SectionList, TouchableOpacity} from 'react-native'
import getStyles from './styles'
import ScreenLayout from '../../appconfig/ScreenLayout';
import ContactItem from '../../components/ContactItem';
import SearchBar from '../../components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../constants/screenNames';

interface IContactItemProps {
    id: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
    [key: string]: string | number | Date | boolean;
}

interface IRenderItem {
    item: IContactItemProps,
    index: number;
}

const CONTACTS = [
    {
        "id": 1,
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 2,
        "firstName": 'Venkat',
        "lastName": 'B',
        "mobileNo": '8812345671',
         "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 3,
        "firstName": 'Rao',
        "lastName": 'B',
        "mobileNo": '8812345673',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 4,
        "firstName": 'Balamarthi',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 5,
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 6,
        "firstName": 'Vankat',
        "lastName": 'B',
        "mobileNo": '8812345671',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 7,
        "firstName": 'Venkat Rao',
        "lastName": 'B',
        "mobileNo": '8812345688',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 8,
        "firstName": 'B',
        "lastName": 'Venky',
        "mobileNo": '8812345666',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 9,
        "firstName": 'Rao',
        "lastName": 'B',
        "mobileNo": '8812345673',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 10,
        "firstName": 'Balamarthi',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 11,
        "firstName": 'Venkatesh',
        "lastName": 'Balamarthi',
        "mobileNo": '8812345675',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
    {
        "id": 12,
        "firstName": 'BalamarthiN',
        "lastName": 'Venky',
        "mobileNo": '8812345633',
        "email": 'EMAIL',
        "address": "address",
        "notes": "notes"
    },
]

const ContactsList = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const styles = getStyles();

    const handleContactCard = (params: IContactItemProps) => {
        navigation.navigate(SCREEN_NAMES.CONTACT_DETAILS,params)
    }
    const hanldeAddIcon = () => {
        navigation.navigate(SCREEN_NAMES.ADD_CONTACT_SCREEN);
    }

    const renderItem = (item: any, index: any, length: number): ReactNode => {
        const isLastItem = index === length - 1;
        return (
            <ContactItem
                item={item}
                index={index}
                onPress={handleContactCard}
                isLastItem={isLastItem}
            />
        )
    }

    const renderSectionHeader = ({section: {title, data}}: {section: {title: string, data: any[]}}) => {
        return (
            <View>
                <Text style={{
                    fontSize: 20,
                    lineHeight: 28,
                    color: '#D29965',
                    fontWeight: '800',
                    paddingVertical:4
                }}>{title}</Text>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#B28155',

                }}>
                    <FlatList
                        data={data}
                        extraData={data}
                        renderItem={({item,index})=>renderItem(item,index, data?.length)}
                        keyExtractor={keyExtractor}
                        ListEmptyComponent={renderListEmptyComponent}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={2}
                    />

                </View>
                
            </View>
        )
    }

    const renderListEmptyComponent = () => {
        return (
            <Text>{'Empty'}</Text>
        )
    }
    const keyExtractor = useCallback((item: IContactItemProps, index: number) => `${item?.id}-${index}`, [])

    const handleSearch = useCallback((text: string = '') => {
        setSearchQuery(text)
    }, [])

    const contactSections = useMemo(() => {
        const sections: any = {};
        CONTACTS.forEach((contactItem) => {
            const firstLetter: string = contactItem?.firstName[0]?.toUpperCase()?.trim() || '';
            if (!sections[firstLetter]) {
                sections[firstLetter] = {
                    title: firstLetter,
                    data: [],
                };
            } else {
                sections[firstLetter].data.push(contactItem);
            }
        })
        const results = Object.values(sections);
        results.sort((a: any, b: any) => a.title.localeCompare(b.title));
        results.forEach((sectionData) => {
            sectionData?.data.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
        });
        return results

    }, [])


    const filteredSections = useMemo(() => {
        if (!searchQuery?.length) return contactSections;

        const query = searchQuery.trim().toLowerCase();

        return contactSections.map(section => {
            const filteredData = section.data.filter(contact =>
                contact.firstName.toLowerCase().includes(query) ||
                contact.mobileNo.toLowerCase().includes(query)
            );
            return {...section, data: filteredData};
        }).filter(section => section.data.length > 0);
    }, [searchQuery])
    

    return (
        <ScreenLayout
            isheaderShown={true}
            headerLabel={'Contacts'}
            showBackButton={false}
        >
            <View style={styles.main} >
                <SearchBar value={searchQuery} onChangeText={handleSearch} />
                <SectionList
                    sections={filteredSections || []}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={()=>null}
                    renderSectionHeader={renderSectionHeader}
                    ListEmptyComponent={() => {
                        return (<View style={{
                            flex: 1
                        }}>
                            <Text>{'No contacts found'}</Text>
                        </View>)
                    }}
                />
                <TouchableOpacity style={styles.addIcon} onPress={hanldeAddIcon}>
                    <Text style={styles.addIconText}>{"+"}</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
export default ContactsList;
