import ApartmentIcon from '@mui/icons-material/Apartment';
import EntityInterface from '@irontec/ivoz-ui/entities/EntityInterface';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import defaultEntityBehavior from '@irontec/ivoz-ui/entities/DefaultEntityBehavior';
import selectOptions from './SelectOptions';
import Form from './Form';
import { foreignKeyGetter } from './ForeignKeyGetter';
import { ClientProperties, ClientPropertyList } from './ClientProperties';
import foreignKeyResolver from './ForeignKeyResolver';
import RemoteId from './Field/RemoteId';
import Actions from './Action';
import { EntityValue } from '@irontec/ivoz-ui/services';

const properties: ClientProperties = {
  iden: {
    label: _('Name'),
    pattern: new RegExp('^[^\\s]+$'),
    helpText: _(
      'Used at login screen in username field after user_name@. Cannot contain whitespaces.'
    ),
  },
  domain: {
    label: _('Domain'),
    helpText: _(
      'Added in SIP URI domain fields and used as proxy if none defined in Proxy field'
    ),
  },
  language: {
    label: _('language'),
  },
  desktopLicences: {
    label: _('Desktop licences'),
    helpText: _('For Windows and macOS environments'),
  },
  mobileLicences: {
    label: _('Mobile licences'),
    helpText: _('For Android and iOS devices'),
  },
  authType: {
    label: _('Auth type'),
    enum: {
      password: _('Password'),
      ldap: _('LDAP'),
    },
    visualToggle: {
      ldap: {
        show: ['ldapServer', 'ldapQuery'],
        hide: [],
      },
      password: {
        show: [],
        hide: ['ldapServer', 'ldapQuery'],
      },
    },
  },
  ldapServer: {
    label: _('LDAP server'),
    required: true,
    helpText: 'Example: ldaps://sampleldap.net:636',
  },
  ldapQuery: {
    label: _('LDAP query'),
    required: true,
    helpText: 'Example: uid=%user%,cn=users,cn=accounts,dc=irontec,dc=com',
  },
  remoteId: {
    label: _('Remote vPBX'),
    component: RemoteId,
    memoize: false,
  },
  platform: {
    label: _('Platform'),
  },
  description: {
    label: _('Description'),
    format: 'textarea',
  },
  transport: {
    label: _('Transport'),
    helpText: _('Choose transport protocol for SIP signalling'),
    enum: {
      udp: 'UDP',
      tcp: 'TCP',
      'tls+sip:': 'TLS',
    },
  },
  proxyHost: {
    label: _('Proxy host'),
    helpText: _('Leave empty to send requests to Domain'),
  },
  proxyPort: {
    label: _('Proxy port'),
    helpText: _(
      'Leave empty to use platform default port for selected transport'
    ),
  },
  sdes: {
    label: _('SDES encryption'),
    helpText: _('Media encryption: mandatory, best-effort, disabled'),
  },
  cardDav: {
    label: _('CardDAV'),
    type: 'boolean',
    enum: {
      0: _('Disabled'),
      1: _('Enabled'),
    },
  },
};

const client: EntityInterface = {
  ...defaultEntityBehavior,
  icon: ApartmentIcon,
  iden: 'Client',
  title: 'Clients',
  path: '/clients',
  defaultOrderBy: '',
  toStr: (row: ClientPropertyList<EntityValue>) => row.iden as string,
  properties,
  columns: [
    'iden',
    'platform',
    'desktopLicences',
    'mobileLicences',
    'language',
  ],
  customActions: Actions,
  selectOptions,
  foreignKeyResolver,
  foreignKeyGetter,
  Form,
};

export default client;
