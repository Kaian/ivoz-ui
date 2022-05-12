import { Tooltip } from '@mui/material';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { isActionItem, RouteMapItem } from '../../../../router/routeMapParser';
import EntityService from '../../../../services/entity/EntityService';
import { StyledTableRowEntityCta } from '../Table/ContentTable.styles';
import buildLink from './BuildLink';

type ChildEntityLinksProps = RouteComponentProps & {
  childEntities: Array<RouteMapItem>,
  row: Record<string, any>,
  entityService: EntityService
}

const ChildEntityLinks = (props: ChildEntityLinksProps): JSX.Element => {

  const { entityService, childEntities, row, match } = props;
  const entity = entityService.getEntity();
  const ChildDecorator = entity.ChildDecorator;

  return (
    <>
        {childEntities.map((routeMapItem, key: number) => {

            if (isActionItem(routeMapItem)) {
              return (
                <routeMapItem.action />
              );
            }

            const Icon = routeMapItem.entity?.icon as React.FunctionComponent;
            const title = routeMapItem.entity?.title as JSX.Element;
            const link = buildLink(routeMapItem.route || '', match, row.id);

            return (
              <ChildDecorator key={key} routeMapItem={routeMapItem} row={row}>
                <Tooltip
                  title={title}
                  placement="bottom-start"
                  enterTouchDelay={0}
                >
                  <StyledTableRowEntityCta to={link}>
                    <Icon />
                  </StyledTableRowEntityCta>
                </Tooltip>
              </ChildDecorator>
            );
        })}
    </>
  );
}

export default withRouter(ChildEntityLinks);