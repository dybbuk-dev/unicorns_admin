/**
 * I18n dictionary for the en.
 */

const ptBR = {
  app: {
    title: 'Crypto Unicorns Back-end',
  },

  auth: {
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'O email já está sendo usado',
    invalidEmail: 'Por favor forneça um email válido',
    passwordReset: {
      invalidToken:
        'Link de redefinição de senha inválido ou expirado',
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Link de verificação de email inválido ou expirado.',
      error: `Email não encontrado.`,
      signedInAsWrongUser: `Esta confirmação de email foi enviada para {0} mas você está acessando como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'A senha antiga é inválida',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      destroyingHimself: `Você não pode deletar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
      revokingPlanUser: `Você não pode revogar a permissão do responsável pelo plano ativo`,
      destroyingPlanUser: `Você não pode deletar o responsável pelo plano ativo`,
    },
  },

  tenant: {
    exists:
      'There is already a company on this application.',
    url: {
      exists: 'This company URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this company. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
    inUse: {
      message: '`{0}` is in use',
    },
    notFound: {
      message: 'Não encontrado',
    },
    forbidden: {
      message: 'Não permitido',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  email: {
    error: `Email não configurado.`,
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida em modo de demonstração.',
  },

  entities: {
    shop: {
      errors: {
        unique: {
          name: 'Name must be unique.',
        },
      },
    },
    department: {
      errors: {
        unique: {
          name: 'Name must be unique.',
        },
      },
    },
    section: {
      errors: {
        unique: {
          name: 'Name must be unique.',
        },
      },
    },
    shelf: {
      errors: {
        unique: {
          name: 'Name must be unique.',
        },
      },
    },
    facing: {
      errors: {
        unique: {
          sn: 'Serial Number must be unique.',
        },
      },
    },
  },
};

export default ptBR;
