import { CardContent, Typography } from '@mui/material';
import { RouteMapItem } from '../../../../router/routeMapParser';
import EntityService from '../../../../services/entity/EntityService';
import DeleteRowButton from '../CTA/DeleteRowButton';
import EditRowButton from '../CTA/EditRowButton';
import ViewRowButton from '../CTA/ViewRowButton';
import ListContentValue from '../ListContentValue';
import ChildEntityLinks from '../Shared/ChildEntityLinks';
import { StyledCardActions, StyledCard, StyledCardContainer } from './ContentCard.styles';

interface ContentCardProps {
  childEntities: Array<RouteMapItem>,
  entityService: EntityService,
  rows: Record<string, any>,
  ignoreColumn: string | undefined,
  path: string,
}

const ContentCard = (props: ContentCardProps): JSX.Element => {

  const { childEntities, entityService, rows, path, ignoreColumn } = props;

  const columns = entityService.getCollectionColumns();
  const acl = entityService.getAcls();

  return (
    <>
      {rows.map((row: any, rKey: any) => {

        return (
          <StyledCard key={rKey}>
            <CardContent>
              {Object.keys(columns).map((key: string) => {
                if (key === ignoreColumn) {
                  return null;
                }
                const column = columns[key];

                return (
                  <Typography key={key}>
                    <strong>{column.label}:</strong>
                    &nbsp;
                    <ListContentValue
                      columnName={key}
                      column={column}
                      row={row}
                      entityService={entityService}
                    />
                  </Typography>
                );
              })}
            </CardContent>
            <StyledCardActions>
              <StyledCardContainer>
                {acl.detail && !acl.update && <ViewRowButton row={row} path={path} />}
                {acl.update && <EditRowButton row={row} path={path} />}
                {acl.delete && <DeleteRowButton row={row} entityService={entityService} />}
              </StyledCardContainer>
              <StyledCardContainer>
                <ChildEntityLinks childEntities={childEntities} row={row} />
              </StyledCardContainer>
            </StyledCardActions>
          </StyledCard>
        );
      })}
    </>
  );
}

export default ContentCard;