import React, {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {View, Text, SectionList, TouchableOpacity, Alert, Platform} from 'react-native'
import getStyles from './styles'
import ScreenLayout from '../../components/layout';
import ContactItem from './ContactItem';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../components/shared/SearchBar';
import {SCREEN_LABELS, SCREEN_NAMES, SCREEN_TITLES} from '../../constants';
import {IContactItemProps} from '../../types/contactslist';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import Contacts, {Contact} from 'react-native-contacts';
import {gettContacts} from '../../store/slices/contactSlice';
import {setLoader} from '../../store/slices/commonSlice';

interface IRawContact {
  recordID: string;
  givenName: string;
  familyName: string;
  phoneNumbers: { number: string; label: string }[];
  emailAddresses: { email: string; label: string }[];
  postalAddresses: { street: string; city: string; region: string; postCode: string; country: string; label: string; state?: string }[];
  [key: string]: any;
}

interface IAppContact {
  id: string | number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  address: string;
  notes?: string;
  imageUri?: string;
}

const isEnabledRemoteContacts: boolean = true;




const ContactsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const remoteContacts = useSelector((state: RootState) => state.contacts.remoteContacts);
    const dispatch = useDispatch<AppDispatch>();

     const mapContacts = (rawContacts: IRawContact[]): IAppContact[] => {
            return rawContacts.map((contact, index) => ({
                id: contact?.recordID,
                firstName: contact.givenName || '',
                lastName: contact.familyName || '',
                mobileNo: contact.phoneNumbers?.[0]?.number || '',
                email: contact.emailAddresses?.[0]?.email || '',
                address: contact.postalAddresses?.[0]?.street || '',
                notes: contact.note || '',
                imageUri: contact.thumbnailPath || '',
            }));
        };
    
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const permission = await Contacts.requestPermission();
                dispatch(setLoader(true))
                if (permission === 'authorized') {
                    const allContacts = await Contacts.getAll();
                    const result = mapContacts(allContacts);
                    dispatch(gettContacts(result))
                    dispatch(setLoader(false))

                } else {
                    dispatch(setLoader(false))
                    Alert.alert('Permission Denied', 'Cannot access contacts without permission');
                }
            } catch (error) {
                dispatch(setLoader(false))
                Alert.alert('Error', 'Failed to load contacts');
            } finally {
            }
        };

        fetchContacts();
    }, []);

    const styles = getStyles();

    const handleContactCard = (params: IContactItemProps) => {
        navigation.navigate(SCREEN_NAMES.CONTACT_DETAILS,params)
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
