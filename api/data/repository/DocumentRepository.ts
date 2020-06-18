import dataSet from "./../../db/CrCustom/document";

import { Document } from "../model/types";
import IDocumentRepository from "./interface/IDocumentRepository";

const DocumentRepository: IDocumentRepository = {

    GetById: (id: number): Promise<Document> => {
        return new Promise<Document>((resolve, reject) => {
            resolve({ id, number: "", created: new Date(), updated: new Date() });
        });
    },

    Create: (data: Document): Promise<Document> => {
        return new Promise<Document>((resolve, reject) => {
            resolve();
        });
    },

    Update: (data: Document): Promise<Document> => {
        return new Promise<Document>((resolve, reject) => {
            resolve();
        });
    },

    Delete: (id: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    },

    GetList: (): Promise<Document[]> => {
        return new Promise<Document[]>((resolve, reject) => {
            resolve();
        });
    },
};

export default DocumentRepository;
