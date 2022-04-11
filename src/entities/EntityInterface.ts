import { CancelToken } from "axios";
import { EntityList } from "../router/parseRoutes";
import { PartialPropertyList, PropertySpec } from "../services/api/ParsedApiSpecInterface";
import EntityService, { EntityValues, VisualToggleStates } from "../services/entity/EntityService";
import React from "react";
import { match } from "react-router-dom";
import { EntityFormProps } from "./DefaultEntityBehavior";
import { RouteMapItem } from '../router/routeMapParser';

export type ListDecoratorPropsType = {
    field: string,
    row: any,
    property: PropertySpec,
    ignoreCustomComponent?: true,
};

export type ListDecoratorType = React.FunctionComponent<ListDecoratorPropsType>;

export type ChildDecoratorType = React.FunctionComponent<{
    routeMapItem: RouteMapItem,
    row: Record<string, any>
}>;

export interface foreignKeyResolverProps {
    data: any,
    allowLinks?: boolean,
    entityService?: EntityService,
    cancelToken?: CancelToken,
    entities?: EntityList,
    skip?: Array<string>
}

export type foreignKeyResolverType = (props: foreignKeyResolverProps) => Promise<any>;
export type ForeignKeyGetterTypeArgs = {
    cancelToken?: CancelToken,
    entityService: EntityService,
    match: match,
    row?: EntityValues,
    filterContext?: boolean,
}
export type ForeignKeyGetterType = (props: ForeignKeyGetterTypeArgs) => Promise<any>;
export type FetchFksCallback = (data: { [key: string]: any }) => void;
export type SelectOptionsArgs = {
    callback: FetchFksCallback,
    cancelToken?: CancelToken,
}
export type SelectOptionsType<T = any> = (props: SelectOptionsArgs, customProps?: T) => Promise<unknown>;

export type EntityAclType = {
    iden?: string,
    create: boolean,
    read: boolean,
    detail: boolean,
    update: boolean,
    delete: boolean,
};

export interface ViewProps {
    entityService: EntityService,
    row: any,
    groups: any,
}
export type ViewType = (props: ViewProps) => JSX.Element | null;

export interface EntityValidatorValues { [label: string]: string }
export type EntityValidatorResponse = Record<string, string | JSX.Element>;
export type EntityValidator = (
    values: EntityValidatorValues,
    properties: PartialPropertyList,
    visualToggles: VisualToggleStates
) => EntityValidatorResponse;

export enum OrderDirection {
    asc = 'asc',
    desc = 'desc',
}


export default interface EntityInterface {
    initialValues: any,
    validator: EntityValidator,
    marshaller: (T: any, properties: PartialPropertyList) => any,
    unmarshaller: (T: any, properties: PartialPropertyList) => any,
    foreignKeyResolver: foreignKeyResolverType,
    foreignKeyGetter: ForeignKeyGetterType,
    selectOptions?: SelectOptionsType,
    Form: React.FunctionComponent<EntityFormProps>,
    View: ViewType,
    ListDecorator: ListDecoratorType,
    ChildDecorator: ChildDecoratorType,
    acl: EntityAclType,
    iden: string,
    title: string | JSX.Element,
    path: string,
    columns: Array<string>,
    properties: PartialPropertyList,
    toStr: (row: EntityValues) => string,
    defaultOrderBy: string,
    defaultOrderDirection: OrderDirection,
    icon: React.FunctionComponent
}