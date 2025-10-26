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

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary/   # Error handling wrapper
│   ├── layout/          # Layout components (Header, Footer)
│   ├── modals/          # Modal components and loaders
│   └── shared/          # Shared components (SearchBar)
├── config/              # Configuration files
│   ├── colors.ts        # Color palette
│   ├── labels.ts        # UI labels and text
│   └── storage.ts       # Storage configuration
├── constants/           # App constants and static data
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

#### 1. **Layered Architecture**
```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│        (Screens & Components)       │
├─────────────────────────────────────┤
│           Business Logic Layer      │
│         (Redux Store & Sagas)       │
├─────────────────────────────────────┤
│           Service Layer             │
│        (API & Device Services)      │
├─────────────────────────────────────┤
│           Data Layer                │
│      (AsyncStorage & Constants)     │
└─────────────────────────────────────┘
```

#### 2. **Component-Based Architecture**
- **Atomic Design Principles**: Components organized from atoms to organisms
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Shared components in `src/components/shared/`
- **Screen-Specific Components**: Feature-specific components co-located with screens

#### 3. **State Management Pattern**
- **Redux Toolkit**: Modern Redux with simplified boilerplate
- **Slice Pattern**: Feature-based state organization
- **Immutable Updates**: Using Immer under the hood
- **Type Safety**: Full TypeScript integration with typed actions and selectors

#### 4. **Navigation Architecture**
- **Stack-Based Navigation**: React Navigation v7 with native stack
- **Centralized Route Management**: All routes defined in `RouterConstants.tsx`
- **Type-Safe Navigation**: TypeScript navigation parameter types
- **Deep Linking Ready**: Prepared for URL-based navigation

#### 5. **Data Flow Pattern**
```
User Action → Component → Redux Action → Reducer → State Update → Component Re-render
```

## 🎯 Design Patterns

### 1. **Container/Presentational Pattern**
```typescript
// Container Component (Smart)
const ContactsList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();
  
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

### 2. **Higher-Order Component (HOC) Pattern**
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

### 3. **Custom Hooks Pattern**
```typescript
// Custom hook for contact operations
const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  
  const addContact = useCallback((contact) => {
    dispatch(addContactAction(contact));
  }, [dispatch]);
  
  return { contacts, addContact };
};
```

### 4. **Factory Pattern**
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

### 5. **Observer Pattern**
```typescript
// Redux state subscription
const ContactsList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  
  useEffect(() => {
    // Component automatically re-renders when contacts state changes
  }, [contacts]);
};
```

### 6. **Strategy Pattern**
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

### 7. **Memoization Pattern**
```typescript
// Performance optimization with useMemo
const contactSections = useMemo(() => {
  const sections = {};
  contacts.forEach(contact => {
    const firstLetter = contact.firstName[0].toUpperCase();
    if (!sections[firstLetter]) {
      sections[firstLetter] = { title: firstLetter, data: [] };
    }
    sections[firstLetter].data.push(contact);
  });
  return Object.values(sections).sort((a, b) => a.title.localeCompare(b.title));
}, [contacts]);
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
- **lodash 4.17.21** - Utility functions library

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
  - Device contact integration
  - Floating action button for quick add
- **Navigation**: Entry point, navigates to details or add contact

### 2. **Add Contact Screen** (`AddContactScreen`)
- **Purpose**: Create new contacts with comprehensive information
- **Features**:
  - Form validation with real-time feedback
  - Image picker integration (camera/gallery)
  - Email format validation
  - Required field validation
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
│ • FAB Add       │    │                 │    │                 │
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

### 1. **Advanced Contact Organization**
```typescript
// Alphabetical sectioning with optimized rendering
const contactSections = useMemo(() => {
  const sections = {};
  contacts.forEach(contact => {
    const firstLetter = contact.firstName[0]?.toUpperCase() || '#';
    if (!sections[firstLetter]) {
      sections[firstLetter] = { title: firstLetter, data: [] };
    }
    sections[firstLetter].data.push(contact);
  });
  
  return Object.values(sections)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(section => ({
      ...section,
      data: section.data.sort((a, b) => a.firstName.localeCompare(b.firstName))
    }));
}, [contacts]);
```

### 2. **Real-time Search with Debouncing**
```typescript
const filteredSections = useMemo(() => {
  if (!searchQuery.length) return contactSections;
  
  const query = searchQuery.trim().toLowerCase();
  return contactSections
    .map(section => ({
      ...section,
      data: section.data.filter(contact =>
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query) ||
        contact.mobileNo.includes(query)
      )
    }))
    .filter(section => section.data.length > 0);
}, [searchQuery, contactSections]);
```

### 3. **Device Integration with Permission Handling**
```typescript
const fetchContacts = async () => {
  try {
    const permission = await Contacts.requestPermission();
    if (permission === 'authorized') {
      const allContacts = await Contacts.getAll();
      const mappedContacts = mapContacts(allContacts);
      dispatch(setContacts(mappedContacts));
    } else {
      Alert.alert('Permission Denied', 'Cannot access contacts without permission');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to load contacts');
  }
};
```

### 4. **Performance Optimizations**
- **Memoized Components**: Using `React.memo` for contact items
- **Virtualized Lists**: SectionList with optimized rendering
- **Efficient Key Extraction**: Proper key props for list items
- **Debounced Search**: Preventing excessive re-renders
- **Lazy Loading**: Components loaded on demand

### 5. **Form Validation System**
```typescript
const validateEmail = (email: string): boolean => {
  return emailValidator.validate(email);
};

const validateForm = (formData: IContactForm): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return errors;
};
```

### 6. **Image Management System**
```typescript
const handleImagePicker = () => {
  const options = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 300,
    maxHeight: 300,
  };
  
  ImagePicker.showImagePicker(options, (response) => {
    if (response.uri) {
      setImageUri(response.uri);
    }
  });
};
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

#### Testing Strategy
```typescript
// Unit tests with Jest
describe('ContactsList', () => {
  it('should render contacts in alphabetical order', () => {
    const { getByText } = render(<ContactsList />);
    expect(getByText('A')).toBeTruthy();
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

#### 4. **Permission Issues**
- **Android**: Ensure permissions are declared in `AndroidManifest.xml`
- **iOS**: Add usage descriptions to `Info.plist`
- **Runtime**: Handle permission requests gracefully

#### 5. **Contact Access Issues**
```typescript
// Debug contact permissions
const checkContactPermission = async () => {
  const permission = await Contacts.checkPermission();
  console.log('Contact permission status:', permission);
  
  if (permission === 'undefined') {
    const newPermission = await Contacts.requestPermission();
    console.log('New permission status:', newPermission);
  }
};
```

### Performance Debugging

#### Memory Leaks
```typescript
// Use React DevTools Profiler
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Component render time:', { id, phase, actualDuration });
};

<Profiler id="ContactsList" onRender={onRenderCallback}>
  <ContactsList />
</Profiler>
```

#### Bundle Size Analysis
```bash
# Analyze bundle size
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js --sourcemap-output android-bundle.map

# Use bundle analyzer
npm install -g react-native-bundle-visualizer
react-native-bundle-visualizer
```

## 📊 Performance Metrics

### Target Performance Goals
- **App Launch Time**: < 3 seconds
- **Screen Transition**: < 300ms
- **Search Response**: < 100ms
- **Contact Load**: < 2 seconds for 1000+ contacts
- **Memory Usage**: < 100MB baseline
- **Bundle Size**: < 50MB

### Monitoring Tools
- **Flipper**: Real-time debugging and performance monitoring
- **React DevTools**: Component profiling and state inspection
- **Metro**: Bundle analysis and optimization
- **Xcode Instruments**: iOS performance profiling
- **Android Studio Profiler**: Android performance analysis

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** coding standards (ESLint + Prettier)
4. **Write** tests for new features
5. **Commit** changes (`git commit -m 'Add amazing feature'`)
6. **Push** to branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Follow React Native configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use semantic commit messages
- **Testing**: Maintain test coverage above 80%

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Update documentation if needed
- Ensure all tests pass
- Request review from maintainers

## 📞 Contact & Support

**Developer**: Venkatesh Balamarthi  
**Repository**: [https://github.com/venkatBalamarthi/Contacts-List-App](https://github.com/venkatBalamarthi/Contacts-List-App)  
**Issues**: [GitHub Issues](https://github.com/venkatBalamarthi/Contacts-List-App/issues)

### Getting Help
- **Documentation**: Check this README and inline code comments
- **React Native Docs**: [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- **React Navigation**: [https://reactnavigation.org/docs/getting-started](https://reactnavigation.org/docs/getting-started)
- **Redux Toolkit**: [https://redux-toolkit.js.org/introduction/getting-started](https://redux-toolkit.js.org/introduction/getting-started)

---

**Built with ❤️ using React Native, TypeScript, and Redux Toolkit**

*Last Updated: October 2025*
