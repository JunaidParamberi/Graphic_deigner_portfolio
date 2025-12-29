declare module 'react-helmet-async' {
    import * as React from 'react';
    
    export interface HelmetProps {
        base?: any;
        bodyAttributes?: any;
        children?: React.ReactNode;
        defaultTitle?: string;
        defer?: boolean;
        encodeSpecialCharacters?: boolean;
        htmlAttributes?: any;
        link?: any[];
        meta?: any[];
        noscript?: any[];
        onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
        script?: any[];
        style?: any[];
        title?: string;
        titleAttributes?: any;
        titleTemplate?: string;
        prioritizeSeoTags?: boolean; 
    }

    export class Helmet extends React.Component<HelmetProps> {}
    
    export interface HelmetProviderProps {
        context?: {};
        children?: React.ReactNode;
    }
    
    export class HelmetProvider extends React.Component<HelmetProviderProps> {}
}