import { IconCompass } from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { APIError } from "../../../app/errors/APIError";
import { CompanyService } from "../../../app/services/CompanyService";
import { IGetCompanyResponse } from "../../../types/company";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { UserService } from "../../../app/services/UserService";

export const CompanyDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState<IGetCompanyResponse | null>(null);
    const [clientData, setClientData] = useState<any>({
        companyId: company?.externalId,
        userId: null
    });
    const { id } = useParams()
    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);
                const companiesData = await CompanyService.getCompaniesById(String(id));

                setCompany(companiesData);
            } catch (err) {
                if (err instanceof APIError) {
                    toast.error(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [id]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast.promise(UserService.createExternalUser({ userId: clientData.userId, companyId: String(company?.externalId) }), {
            loading: 'Criando usuário...',
            success: <b>Usuário criado com sucesso!</b>,
            error: <b>Erro ao criar o usuário</b>,
        }).finally(() => {
            setIsLoading(false);

        })
    }
    return (
        <>
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black-100">Empresa {company?.name}</h1>
                    <div className="flex flex-row gap-4 mt-2">
                        <p className="text-slate-400">
                            <strong>Host:</strong> {company?.host}
                        </p>
                        <p className="text-slate-400">
                            <strong>ID Externo:</strong> {company?.externalId}
                        </p>
                    </div>
                </div>
            </header>
            <form
                className="mt-6 flex w-full max-w-fit bg-white min-w-[400px] p-4 rounded-lg flex-col gap-3"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="flex flex-col mb-4">
                    <h1 className="text-lg font-bold">Criar novo user</h1>
                    <small className="text-sm text-gray-700">vincular ao cliente #{company?.externalId}</small>
                </div>
                <Input
                    placeholder="Id do novo usuário"
                    label="Novo usuário"
                    name="password"
                    // value={formData.password}
                    onChange={(e) => setClientData((event: any) => ({ ...event, userId: e.target.value }))}
                />
                <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Criar novo usuário
                    <IconCompass size={24} stroke={1.5} />
                </Button>
            </form>
        </>
    )
}