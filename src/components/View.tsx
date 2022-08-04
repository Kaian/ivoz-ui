import { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EntityService from '../services/entity/EntityService';
import EntityInterface from '../entities/EntityInterface';
import withRowData from './withRowData';

interface ViewProps extends EntityInterface {
  entityService: EntityService;
  history: any;
  match: any;
  row: any;
  View: any;
}

const View: any = (props: ViewProps & RouteComponentProps) => {
  const { View: EntityView, row, entityService, foreignKeyResolver } = props;
  const [parsedData, setParsedData] = useState<any>({});
  const [foreignKeysResolved, setForeignKeysResolved] =
    useState<boolean>(false);

  // flat detailed model
  foreignKeyResolver({ data: row, allowLinks: true, entityService }).then(
    (data: any) => {
      setParsedData(data);
      setForeignKeysResolved(true);
    }
  );

  if (!foreignKeysResolved) {
    return null;
  }

  return (
    <div>
      <EntityView {...props} row={parsedData} />
    </div>
  );
};

export default withRouter<any, any>(withRowData(View));
