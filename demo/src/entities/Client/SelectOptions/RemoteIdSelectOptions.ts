import { SelectOptionsType } from '@irontec/ivoz-ui/entities/EntityInterface';
import Client from '../Client';
import store from 'store';
import { DropdownChoices } from '@irontec/ivoz-ui';

interface CustomProps {
  platformId: number | string;
}

const RemoteIdSelectOptions: SelectOptionsType<CustomProps> = (
  { callback, cancelToken },
  customProps
): Promise<unknown> => {
  const platformId = customProps?.platformId;

  const params: any = {
    _platformId: platformId,
  };

  const getAction = store.getActions().api.get;
  return getAction({
    path: Client.path + '/available',
    params,
    successCallback: async (data) => {
      const hintedData = data as Array<{
        id: number;
        name: string;
        domain: string;
      }>;
      const choices: DropdownChoices = [];
      for (const item of hintedData) {
        choices.push({ id: item.id, label: item.name });
      }

      callback(choices, hintedData);
    },
    cancelToken,
    silenceErrors: true,
  });
};

export default RemoteIdSelectOptions;
