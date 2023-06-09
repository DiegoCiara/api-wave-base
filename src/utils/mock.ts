// mocks
import { companies, contacts, users, pipelines, deals, deals2, deals3, deals4 } from './dataMock';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';

const mocks = async (): Promise<void> => {
  // inserindo dados iniciais no Banco de dados;
  try {
    if (!(await User.findOne({ email: 'admin@wavecrm.com.br' }))) {
      const pass = await bcrypt.hash('die140401', 10);

      await User.create({ name: 'admin', email: 'admin@wavecrm.com.br', role: 'ADMIN', passwordHash: pass }).save();
    }

    if (!(await Pipeline.findOne({ name: 'Lead' }))) {
      pipelines.map(async (pipeline) => await Pipeline.create({ ...pipeline }).save()).sort();

      console.log('pipelines ok');
    }

    if (!(await Company.findOne({ name: 'Prospecção' }))) {
      companies.map(async (company) => await Company.create({ ...company }).save());

      console.log('companies ok');
    }

    if (!(await User.findOne({ email: 'suporte.diegociara@gmail.com' }))) {
      users.map(async (seller) => {
        const passwordHash = await bcrypt.hash(seller.password, 10);
        await User.create({ ...seller, passwordHash }).save();
      });
      console.log('users ok');
    }

    const companiesFind = await Company.find();
    if (!(await Contact.findOne({ email: 'teste@wavecrm.com.br' })) && companiesFind.length >= 5) {
      contacts.map(async (contact, index) => {
        await Contact.create({ ...contact, company: companiesFind[index] }).save();
      });

      console.log('contacts ok');
    }

    const contactFind = await Contact.find();
    const userFind = await User.find();
    const pipelineFind = await Pipeline.find();
    if (!(await Deal.findOne({ name: 'Teste' })) && contactFind.length >= 1 && pipelineFind.length >= 1 && companiesFind.length >= 1) {
      deals.map(async (deal, index) => {
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          // status: 'ARCHIVED',
          activity: [
            {
              name: 'teste',
              description: 'testando',
              // createdAt: new Date(),
              createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
              createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
              tag: 'COLD',
            },
          ],
          value: Math.random() * (132100 - 23580) + 23580,
          status: 'ARCHIVED',
          // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
          // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
        }).save();
      });

      // deals2.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'INPROGRESS',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      // deals3.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      // deals4.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();

      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      console.log('deals ok');
    }

    const dealsFind = await Deal.find();
    if (!dealsFind.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};

export default mocks;
