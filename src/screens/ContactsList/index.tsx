import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, SectionList, TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux';
import getStyles from '@screens/ContactsList/styles'
import ScreenLayout from '@components/layout/index';
import ContactItem from '@screens/ContactsList/ContactItem';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '@components/shared/SearchBar';
import {SCREEN_LABELS, SCREEN_NAMES, SCREEN_TITLES} from '@constants/index';
import {IContactItemProps} from '@types/contactslist.';
import {NavigationScreenProp} from '@navigation/types';
import useContacts from '@hooks/useContacts';
import {RootState} from '@store/index';

const isEnabledRemoteContacts: boolean = true;

const ContactsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<NavigationScreenProp>();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const remoteContacts = useSelector((state: RootState) => state.contacts.remoteContacts);
    useContacts();

    const styles = getStyles();

    const handleContactCard = (params: IContactItemProps) => {
        navigation.navigate(SCREEN_NAMES.CONTACT_DETAILS, params)
    }
    const hanldeAddIcon = () => {
        navigation.navigate(SCREEN_NAMES.ADD_CONTACT_SCREEN);
    }

    const renderSectionHeader = ({section: {title}}: {section: {title: string}}) => {
        return (
            <Text style={styles.sectionHeader}>{title}</Text>
        )
    }

    const handleSearch = useCallback((text: string = '') => {
        setSearchQuery(text)
    }, [])

    const renderSectionListEmptyComponent = () => {
        return (
            <View style={styles.sectionEmptyComponentView}>
            <Text>{SCREEN_LABELS.NO_CONTACTS_FOUND}</Text>
        </View>)

    }

    const contactSections = useMemo(() => {
        const sections: any = {};
        const list = isEnabledRemoteContacts ? remoteContacts : contacts;
        list?.forEach((contactItem: any) => {
            const firstLetter: string = contactItem?.firstName[0]?.toUpperCase()?.trim() || '';
            if (!sections[firstLetter]) {
                sections[firstLetter] = {
                    title: firstLetter,
                    data: [contactItem],
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

    }, [contacts, remoteContacts])


    const filteredSections = useMemo(() => {
        if (!searchQuery?.length) return contactSections;

        const query = searchQuery.trim().toLowerCase() || '#';

        return contactSections.map(section => {
            const filteredData = section.data.filter(contact =>
                contact.firstName.toLowerCase().includes(query) ||
                contact.mobileNo.toLowerCase().includes(query)
            );
            return {...section, data: filteredData};
        }).filter(section => section.data.length > 0);
    }, [searchQuery, contactSections])
    

    return (
        <ScreenLayout
            isheaderShown={true}
            headerLabel={SCREEN_TITLES.CONTACTS}
            showBackButton={false}
        >
            <View style={styles.main} >
                <SearchBar value={searchQuery} onChangeText={handleSearch} />
                <SectionList
                    sections={filteredSections || []}
                    keyExtractor={(item) => item?.id?.toString()}
                    extraData={contactSections}
                    renderItem={({item, index, section}) => (
                        <ContactItem
                            item={item}
                            index={index}
                            onPress={handleContactCard}
                            isLastItem={index === section.data.length - 1}
                        />
                    )}
                    renderSectionHeader={renderSectionHeader}
                    ListEmptyComponent={renderSectionListEmptyComponent}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                />
                <TouchableOpacity style={styles.addIcon} onPress={hanldeAddIcon}>
                    <Text style={styles.addIconText}>{"+"}</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
export default ContactsList;
