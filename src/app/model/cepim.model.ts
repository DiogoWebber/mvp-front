export interface CepimModel {
    id?: number;
    dataReferencia?: string;
    motivo?: string;
    orgaoSuperior?: OrgaoSuperior;
    pessoaJuridica?: PessoaJuridica;
    convenio?: Convenio;
  }
  
  export interface OrgaoSuperior {
    nome?: string;
    codigoSIAFI?: string;
    cnpj?: string;
    sigla?: string;
    descricaoPoder?: string;
    orgaoMaximo?: OrgaoMaximo;
  }
  
  export interface OrgaoMaximo {
    codigo?: string;
    sigla?: string;
    nome?: string;
  }
  
  export interface PessoaJuridica {
    id?: number;
    cpfFormatado?: string;
    cnpjFormatado?: string;
    numeroInscricaoSocial?: string;
    nome?: string;
    razaoSocialReceita?: string;
    nomeFantasiaReceita?: string;
    tipo?: string;
  }
  
  export interface Convenio {
    codigo?: string;
    objeto?: string;
    numero?: string;
  }
  