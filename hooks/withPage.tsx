import { RichTranslationValuesPlain } from "next-intl";
import { getTranslator } from "next-intl/server";

const withPage = (PageComponent: ({ params, searchParams, t }: {
    params: { [k in string]: any };
    searchParams: { [k in string]: any };
    t: {
        <TargetKey extends any>(key: TargetKey, values?: any, formats?: any): string;
        rich<TargetKey_1 extends any>(key: TargetKey_1, values?: RichTranslationValuesPlain | undefined, formats?: any): string;
        raw<TargetKey_2 extends any>(key: TargetKey_2): any;
    }
}) => Promise<JSX.Element> | JSX.Element, namespace: string) => {
    const WithPage = async ({
        params: { locale, ...params },
        searchParams
    }: {
        params: { [k in string]: any },
        searchParams: { [k in string]: any }
    }) => {
        const t = await getTranslator(locale, namespace)
        return await PageComponent({
            params,
            searchParams,
            t
        })
    }
    return WithPage
}
export default withPage