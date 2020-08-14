import handlebars from 'handlebars';

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
        const parseTempalte = handlebars.compile(template);

        return parseTempalte(variables);
    }
}

export default HandlebarsMailTemplateProvider;