# Contacts List App

A modern React Native application for managing contacts with a clean, intuitive interface. Built with TypeScript and featuring alphabetical contact organization, search functionality, and comprehensive contact management capabilities.

## 📱 Features

- **Contact Management**: Add, view, and organize contacts
- **Device Integration**: Access and sync with device contacts
- **Alphabetical Sorting**: Contacts automatically organized by first letter with section headers
- **Real-time Search**: Search by name or phone number with instant filtering
- **Image Support**: Add profile pictures via camera or gallery selection
- **Form Validation**: Email validation and required field checks
- **Cross-Platform**: Runs seamlessly on both iOS and Android
- **Offline Support**: Local storage with AsyncStorage
- **Permission Handling**: Proper contact permission management
- **Custom Hooks**: Modular business logic with reusable hooks
- **Debounced Input**: Optimized form input with debouncing for better performance

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary/   # Error handling wrapper
│   ├── layout/          # Layout components (Header, Footer)
│   ├── modals/          # Modal components and loaders
│   └── shared/          # Shared components (SearchBar, TextInputField)
├── config/              # Configuration files
│   ├── colors.ts        # Color palette
│   ├── labels.ts        # UI labels and text
│   └── storage.ts       # Storage configuration
├── constants/           # App constants and static data
├── hooks/               # Custom React hooks
│   └── useContacts.ts   # Contact management hook
├── navigation/          # Navigation configuration
│   ├── AppRouter.tsx    # Main navigation setup
│   ├── RootNavigation.tsx # Navigation utilities
│   └── RouterConstants.tsx # Route definitions
├── screens/            # Screen components
│   ├── AddContactScreen/ # Add new contact
│   ├── ContactDetails/   # Contact detail view
│   └── ContactsList/     # Main contacts list
├── services/           # API services and external integrations
├── store/             # State management (Redux Toolkit)
│   ├── index.ts        # Store configuration
│   ├── types.ts        # Redux type definitions
│   └── slices/         # Redux slices
│       ├── contactSlice.ts # Contact state management
│       └── commonSlice.ts  # Common app state
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and helpers
```

### Core Architecture Patterns

#### 1. **Custom Hooks Pattern**
The app leverages custom hooks for business logic separation and reusability:

```typescript
// useContacts Hook - Handles contact fetching and permissions
const useContacts = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const permission = await Contacts.requestPermission();
                dispatch(setLoader(true))
                if (permission === 'authorized') {
                    const allContacts = await Contacts.getAll();
                    const result = mapContacts(allContacts);
                    dispatch(getContacts(result))
                } else {
                    Alert.alert('Permission Denied', 'Cannot access contacts without permission');
                }
            } catch (error) {
                console.log('Error fetching contacts:', error);
                Alert.alert('Error', 'Failed to load contacts');
            } finally {
                dispatch(setLoader(false))
            }
        };
        fetchContacts();
    }, [dispatch]);
}
```

#### 2. **Modern Import Style with Path Aliases**
The project uses TypeScript path mapping for clean, maintainable imports:

```typescript
// Modern import patterns used throughout the app
import ScreenLayout from '@components/layout/index';
import SearchBar from '@components/shared/SearchBar';
import TextInputField from '@components/shared/TextInputField';
import {SCREEN_LABELS, SCREEN_NAMES, SCREEN_TITLES} from '@constants/index';
import {IContactItemProps} from '@types/contactslist';
import {NavigationScreenProp} from '@navigation/types';
import useContacts from '@hooks/useContacts';
import {RootState, AppDispatch} from '@store/index';
import {addContact, addRemoteContact} from '@store/slices/contactSlice';
import {setLoader} from '@store/slices/commonSlice';
import {mapContacts, updateContact} from '@utils/contactUtils';
import {isValidEmail, isValidMobileNumber} from '@utils/commonUtils';
```

#### 3. **Layered Architecture**
```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│        (Screens & Components)       │
├─────────────────────────────────────┤
│           Business Logic Layer      │
│      (Custom Hooks & Redux)        │
├─────────────────────────────────────┤
│           Service Layer             │
│        (API & Device Services)      │
├─────────────────────────────────────┤
│           Data Layer                │
│      (AsyncStorage & Constants)     │
└─────────────────────────────────────┘
```

#### 4. **Component-Based Architecture**
- **Atomic Design Principles**: Components organized from atoms to organisms
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Shared components in `src/components/shared/`
- **Screen-Specific Components**: Feature-specific components co-located with screens

#### 5. **State Management Pattern**
- **Redux Toolkit**: Modern Redux with simplified boilerplate
- **Slice Pattern**: Feature-based state organization
- **Immutable Updates**: Using Immer under the hood
- **Type Safety**: Full TypeScript integration with typed actions and selectors

#### 6. **Navigation Architecture**
- **Stack-Based Navigation**: React Navigation v7 with native stack
- **Centralized Route Management**: All routes defined in `RouterConstants.tsx`
- **Type-Safe Navigation**: TypeScript navigation parameter types
- **Deep Linking Ready**: Prepared for URL-based navigation

## 🎯 Design Patterns

### 1. **Custom Hooks Pattern**
```typescript
// Custom hook for contact operations
const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const permission = await Contacts.requestPermission();
        dispatch(setLoader(true));
        
        if (permission === 'authorized') {
          const allContacts = await Contacts.getAll();
          const result = mapContacts(allContacts);
          dispatch(getContacts(result));
        } else {
          Alert.alert('Permission Denied', 'Cannot access contacts without permission');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load contacts');
      } finally {
        dispatch(setLoader(false));
      }
    };
    
    fetchContacts();
  }, [dispatch]);
};
```

### 2. **Container/Presentational Pattern**
```typescript
// Container Component (Smart)
const ContactsList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const remoteContacts = useSelector((state: RootState) => state.contacts.remoteContacts);
  useContacts(); // Custom hook usage
  
  return <ContactsListView contacts={contacts} onAddContact={handleAdd} />;
};

// Presentational Component (Dumb)
const ContactsListView = ({ contacts, onAddContact }) => {
  return (
    <SectionList
      sections={contacts}
      renderItem={ContactItem}
    />
  );
};
```

### 3. **Debounced Input Pattern**
```typescript
// Optimized form input with debouncing
const debouncedUpdate = useMemo(
  () =>
    debounce((field: string = '', text: string = '') => {
      setContactDetails((prev) => ({...prev, [field]: text}));
      setErrors((prev) => {
        if (prev[field]) return {...prev, [field]: ''};
        return prev;
      });
    }, 400),
  []
);

const handleInputChange = useCallback((field: string, text: string) => {
  setLocalInput((prev) => ({...prev, [field]: text}));
  debouncedUpdate(field, text);
}, [debouncedUpdate]);
```

### 4. **Memoized Components Pattern**
```typescript
// Performance-optimized component with React.memo
const DebouncedTextInput = React.memo(({field, value, onChange, error}: any) => {
  const styles = getStyles();
  const isMobileNumber = field === 'mobileNo';
  
  return (
    <>
      <TextInput
        placeholder={DETAILS_FILEDS[field]}
        value={value}
        onChangeText={(text) => onChange(field, text)}
        style={error ? styles.textInputErrorStyle : styles.textInputStyle}
        keyboardType={field === 'mobileNo' ? 'numeric' : 'default'}
        maxLength={isMobileNumber ? 10 : 30}
      />
      {error && <Text style={styles.error}>{`${DETAILS_FILEDS[field]} is required`}</Text>}
    </>
  );
});
```

### 5. **Higher-Order Component (HOC) Pattern**
```typescript
// Layout HOC
const ScreenLayout = ({ children, headerLabel, showBackButton }) => (
  <SafeAreaView>
    <Header title={headerLabel} showBack={showBackButton} />
    {children}
    <Footer />
  </SafeAreaView>
);
```

### 6. **Factory Pattern**
```typescript
// Contact mapping factory
const ContactFactory = {
  fromDevice: (rawContact: IRawContact): IAppContact => ({
    id: rawContact.recordID,
    firstName: rawContact.givenName || '',
    lastName: rawContact.familyName || '',
    mobileNo: rawContact.phoneNumbers?.[0]?.number || '',
    email: rawContact.emailAddresses?.[0]?.email || '',
    address: rawContact.postalAddresses?.[0]?.street || '',
  }),
  
  toDevice: (appContact: IAppContact): IRawContact => {
    // Convert app contact to device format
  }
};
```

### 7. **Observer Pattern**
```typescript
// Redux state subscription
const ContactsList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  
  useEffect(() => {
    // Component automatically re-renders when contacts state changes
  }, [contacts]);
};
```

### 8. **Strategy Pattern**
```typescript
// Different contact sources
const ContactStrategies = {
  local: () => getLocalContacts(),
  device: () => getDeviceContacts(),
  remote: () => getRemoteContacts(),
};

const getContacts = (strategy: keyof typeof ContactStrategies) => {
  return ContactStrategies[strategy]();
};
```

### 9. **Memoization Pattern**
```typescript
// Performance optimization with useMemo
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
  });
  
  const results = Object.values(sections);
  results.sort((a: any, b: any) => a.title.localeCompare(b.title));
  results.forEach((sectionData) => {
    sectionData?.data.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
  });
  
  return results;
}, [contacts, remoteContacts]);
```

## 🚀 Technical Stack

### Core Technologies
- **React Native 0.82.1** - Cross-platform mobile framework
- **TypeScript 5.8.3** - Type-safe JavaScript superset
- **React 19.1.1** - Latest React with concurrent features

### State Management
- **@reduxjs/toolkit 2.9.2** - Modern Redux with RTK Query ready
- **react-redux 9.2.0** - React bindings for Redux
- **redux-saga 1.4.2** - Side effect management for async operations

### Navigation & UI
- **@react-navigation/native 7.1.18** - Navigation library
- **@react-navigation/native-stack 7.5.1** - Native stack navigator
- **react-native-vector-icons 10.3.0** - Comprehensive icon library
- **react-native-modal 14.0.0-rc.1** - Enhanced modal components
- **react-native-safe-area-context 5.5.2** - Safe area handling

### Device Integration
- **react-native-contacts 8.0.7** - Device contacts access
- **react-native-image-picker 8.2.1** - Camera and gallery integration
- **@react-native-async-storage/async-storage 2.2.0** - Local storage

### Utilities & Validation
- **axios 1.12.2** - HTTP client for API calls
- **email-validator 2.0.4** - Email format validation
- **lodash 4.17.21** - Utility functions library (debounce, etc.)

### Development Tools
- **ESLint** - Code linting with React Native config
- **Prettier 2.8.8** - Code formatting
- **Jest 29.6.3** - Testing framework
- **Metro** - JavaScript bundler
- **TypeScript** - Static type checking

## 🔧 Setup Instructions

### Prerequisites

Ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

**System Requirements:**
- **Node.js** >= 20.0.0
- **npm** >= 8.0.0 or **Yarn** >= 1.22.0
- **React Native CLI** >= 20.0.0
- **Android Studio** (for Android development)
- **Xcode** >= 14.0 (for iOS development on macOS)
- **CocoaPods** >= 1.11.0 (for iOS dependencies)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/venkatBalamarthi/Contacts-List-App.git
cd contacts_list_app
```

#### 2. Install Dependencies
```bash
# Using npm
npm install

# OR using Yarn (recommended)
yarn install
```

#### 3. iOS Setup (macOS only)
```bash
# Install Ruby dependencies (if using Bundler)
bundle install

# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Alternative: using bundle exec
cd ios && bundle exec pod install && cd ..
```

#### 4. Android Setup
```bash
# Ensure Android SDK is properly configured
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Clean Android build (if needed)
cd android && ./gradlew clean && cd ..
```

### TypeScript Configuration

The project uses path mapping for clean imports. The `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@screens/*": ["screens/*"],
      "@navigation/*": ["navigation/*"],
      "@store/*": ["store/*"],
      "@hooks/*": ["hooks/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
      "@constants/*": ["constants/*"],
      "@config/*": ["config/*"],
      "@services/*": ["services/*"]
    }
  }
}
```

### Running the Application

#### Start Metro Bundler
```bash
# Using npm
npm start

# Using Yarn
yarn start

# With cache reset (if needed)
npm start -- --reset-cache
```

#### Run on Android
```bash
# Using npm
npm run android

# Using Yarn
yarn android

# Specific device/emulator
npx react-native run-android --deviceId=<device_id>
```

#### Run on iOS
```bash
# Using npm
npm run ios

# Using Yarn
yarn ios

# Specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Development Commands

```bash
# Code linting
npm run lint
yarn lint

# Run tests
npm run test
yarn test

# Type checking
npx tsc --noEmit

# Bundle analysis
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js

# Clean Metro cache
npx react-native start --reset-cache

# Clean all caches
npx react-native clean-project-auto
```

### Environment Configuration

#### Android Permissions
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### iOS Permissions
Add to `ios/contacts_list_app/Info.plist`:
```xml
<key>NSContactsUsageDescription</key>
<string>This app needs access to contacts to display and manage your contact list.</string>
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to take profile pictures.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to select profile pictures.</string>
```

## 📱 Screen Flow & User Journey

### 1. **Contacts List Screen** (`ContactsList`)
- **Purpose**: Main screen displaying all contacts
- **Features**:
  - Alphabetical sectioning with sticky headers
  - Real-time search functionality
  - Device contact integration via `useContacts` hook
  - Floating action button for quick add
  - Remote/local contact switching capability
- **Navigation**: Entry point, navigates to details or add contact

### 2. **Add Contact Screen** (`AddContactScreen`)
- **Purpose**: Create new contacts with comprehensive information
- **Features**:
  - Form validation with real-time feedback
  - Image picker integration (camera/gallery)
  - Email format validation
  - Required field validation
  - Debounced input for better performance
  - Custom TextInputField components
- **Navigation**: Accessible from contacts list, returns after save

### 3. **Contact Details Screen** (`ContactDetails`)
- **Purpose**: View detailed contact information
- **Features**:
  - Full contact information display
  - Profile image viewing
  - Edit capabilities (future enhancement)
  - Call/message integration ready
- **Navigation**: Accessible from contact list items

### User Flow Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Contacts List  │───▶│ Contact Details │    │  Add Contact    │
│                 │    │                 │    │                 │
│ • Search        │    │ • View Info     │    │ • Form Input    │
│ • Alphabetical  │    │ • Edit (Future) │    │ • Image Picker  │
│ • Device Sync   │    │ • Call/Message  │    │ • Validation    │
│ • FAB Add       │    │                 │    │ • Debounced     │
│ • useContacts   │    │                 │    │   Input         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────┐
                    │   Redux Store   │
                    │                 │
                    │ • Contact State │
                    │ • Common State  │
                    │ • Async Actions │
                    └─────────────────┘
```

## 🎯 Key Enhancements & Features

### 1. **Custom Hooks Implementation**
```typescript
// useContacts Hook - Centralized contact management
const useContacts = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const permission = await Contacts.requestPermission();
                dispatch(setLoader(true))
                if (permission === 'authorized') {
                    const allContacts = await Contacts.getAll();
                    const result = mapContacts(allContacts as any);
                    dispatch(getContacts(result))
                } else {
                    Alert.alert('Permission Denied', 'Cannot access contacts without permission');
                }
            } catch (error) {
                console.log('Error fetching contacts:', error);
                Alert.alert('Error', 'Failed to load contacts');
            }
            finally {
                dispatch(setLoader(false))
            }
        };
        fetchContacts();
    }, [dispatch]);
}
```

### 2. **Advanced Contact Organization**
```typescript
// Alphabetical sectioning with optimized rendering
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
  });
  
  const results = Object.values(sections);
  results.sort((a: any, b: any) => a.title.localeCompare(b.title));
  results.forEach((sectionData) => {
    sectionData?.data.sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
  });
  
  return results;
}, [contacts, remoteContacts]);
```

### 3. **Real-time Search with Filtering**
```typescript
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
}, [searchQuery, contactSections]);
```

### 4. **Debounced Form Input**
```typescript
const debouncedUpdate = useMemo(
  () =>
    debounce((field: string = '', text: string = '') => {
      setContactDetails((prev) => ({...prev, [field]: text}));
      setErrors((prev) => {
        if (prev[field]) return {...prev, [field]: ''};
        return prev;
      });
    }, 400),
  []
);

const handleInputChange = useCallback((field: string, text: string) => {
  setLocalInput((prev) => ({...prev, [field]: text}));
  debouncedUpdate(field, text);
}, [debouncedUpdate]);
```

### 5. **Device Integration with Permission Handling**
```typescript
const fetchContacts = async () => {
  try {
    const permission = await Contacts.requestPermission();
    dispatch(setLoader(true));
    
    if (permission === 'authorized') {
      const allContacts = await Contacts.getAll();
      const result = mapContacts(allContacts);
      dispatch(getContacts(result));
    } else {
      Alert.alert('Permission Denied', 'Cannot access contacts without permission');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to load contacts');
  } finally {
    dispatch(setLoader(false));
  }
};
```

### 6. **Performance Optimizations**
- **Memoized Components**: Using `React.memo` for contact items and form fields
- **Virtualized Lists**: SectionList with optimized rendering
- **Efficient Key Extraction**: Proper key props for list items
- **Debounced Search**: Preventing excessive re-renders
- **Custom Hooks**: Separating business logic from UI components
- **Path Aliases**: Clean import statements for better maintainability

### 7. **Form Validation System**
```typescript
const validateForm = (contactDetails: IProfileData): IProfileData => {
  let tempErrors: IProfileData = {};
  
  FIEDLS.forEach(field => {
    if (!(contactDetails[field]?.trim()?.length)) {
      tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
    }
    if (field === 'email' && contactDetails.email && !isValidEmail(contactDetails.email)) {
      tempErrors[field] = `${DETAILS_FILEDS[field]} is required`;
    }
    if (field === 'mobileNo' && contactDetails.mobileNo && !isValidMobileNumber(contactDetails.mobileNo)) {
      tempErrors[field] = `Enter a valid ${DETAILS_FILEDS[field]}`;
    }
  });
  
  return tempErrors;
};
```

### 8. **Image Management System**
```typescript
const pickImage = useCallback(() => {
  launchImageLibrary(
    {mediaType: 'photo', quality: 1},
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response?.assets[0].uri;
        setContactDetails({
          ...contactDetails,
          imageUri: uri || '',
        });
      }
    }
  );
}, [contactDetails]);
```

## 🔮 Future Enhancements

### Planned Features

#### Phase 1: Core Enhancements
- **Edit Contact**: Complete CRUD operations
  ```typescript
  const updateContact = (id: string, updates: Partial<IContact>) => {
    dispatch(updateContactAction({ id, updates }));
  };
  ```
- **Delete Contact**: With confirmation dialogs
- **Contact Groups**: Categorize contacts (Family, Work, Friends)
- **Favorites**: Mark and filter favorite contacts

#### Phase 2: Advanced Features
- **Contact Sync**: Two-way sync with device contacts
- **Backup & Restore**: Cloud synchronization with Google Drive/iCloud
- **Advanced Search**: Multi-field search with filters
- **Contact Import/Export**: VCF file support
- **Call Integration**: Direct calling from the app
- **Message Integration**: SMS/WhatsApp integration

#### Phase 3: Enterprise Features
- **Contact Sharing**: Share contacts via QR codes
- **Bulk Operations**: Select and manage multiple contacts
- **Contact History**: Track contact interactions
- **Analytics**: Contact usage statistics
- **Dark Mode**: Theme switching capability

### Technical Improvements

#### Performance Enhancements
```typescript
// Implement React.lazy for code splitting
const ContactDetails = React.lazy(() => import('./screens/ContactDetails'));

// Add Flipper integration for debugging
if (__DEV__) {
  import('flipper-plugin-react-native-performance').then(
    ({ setupReactNativePerformance }) => {
      setupReactNativePerformance();
    }
  );
}
```

#### API Integration
```typescript
// RESTful API service
class ContactsAPI {
  static async getContacts(): Promise<IContact[]> {
    const response = await axios.get('/api/contacts');
    return response.data;
  }
  
  static async createContact(contact: IContact): Promise<IContact> {
    const response = await axios.post('/api/contacts', contact);
    return response.data;
  }
  
  static async updateContact(id: string, contact: Partial<IContact>): Promise<IContact> {
    const response = await axios.put(`/api/contacts/${id}`, contact);
    return response.data;
  }
}
```

#### Additional Custom Hooks
```typescript
// useDebounce Hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// usePermissions Hook
const usePermissions = () => {
  const [contactPermission, setContactPermission] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<string>('');

  const requestContactPermission = async () => {
    const permission = await Contacts.requestPermission();
    setContactPermission(permission);
    return permission;
  };

  return {
    contactPermission,
    cameraPermission,
    requestContactPermission,
  };
};
```

#### Testing Strategy
```typescript
// Unit tests with Jest
describe('useContacts Hook', () => {
  it('should fetch contacts on mount', async () => {
    const { result } = renderHook(() => useContacts());
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setLoader(true));
    });
  });
});

// Integration tests with Detox
describe('Contact Flow', () => {
  it('should add a new contact', async () => {
    await element(by.id('add-contact-fab')).tap();
    await element(by.id('first-name-input')).typeText('John');
    await element(by.id('save-button')).tap();
    await expect(element(by.text('John'))).toBeVisible();
  });
});
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. **Metro Bundler Issues**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clear all caches
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

#### 2. **iOS Build Issues**
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Reset iOS simulator
xcrun simctl erase all
```

#### 3. **Android Build Issues**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Clear Gradle cache
rm -rf ~/.gradle/caches/

# Reset Android emulator
$ANDROID_HOME/emulator/emulator -avd <AVD_NAME> -wipe-data
```

#### 4. **TypeScript Path Mapping Issues**
```bash
# Ensure Metro config includes path mapping
# Check metro.config.js for resolver configuration
# Restart Metro bundler after tsconfig changes
```

#### 5. **Permission Issues**
- **Android**: Ensure permissions are declared in `AndroidManifest.xml`
- **iOS**: Add usage descriptions to `Info.plist`
- **Runtime**: Handle permission requests gracefully with custom hooks

#### 6. **Contact Access Issues**
```typescript
// Debug contact permissions
const checkContactPermission = async () => {
  const permission = await Contacts.checkPermission();
  console.log('Contact permission status:', permission);
  
  if (permission === 'undefined') {
