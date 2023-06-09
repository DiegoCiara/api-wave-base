import Company from '@entities/Company';
import Contact from '@entities/Contact';
import transport from '@src/modules/mailer';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface ContactInterface {
  name?: string;
  cpf_cnpj?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  company?: Company;
}

class ContactController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = (await Contact.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contact = await Contact.findOne(id, queryBuilder(req.query));

      if (!contact) return res.status(400).json({ message: 'Contact does not exist' });

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, cpf_cnpj, email, phone, city, state, company }: ContactInterface = req.body;

      if (!name || !cpf_cnpj || !email  || !company) return res.status(400).json({message: 'Invalid values for contacts'});

      const findContact = await Contact.findOne({ cpf_cnpj });

      if (findContact) return res.status(400).json({ message: 'Contact already exists' });

      const contact = await Contact.create({ name, cpf_cnpj, email, phone, city, state, company }).save();

      if (!contact) return res.status(400).json({ message: 'Cannot create contact' });

      transport.sendMail({
        to: email,
        from: '"Wave CRM" <api@contato.com>',
        subject: 'Solicitação de acesso ', // assunto do email
        template: 'newContact',

        context: { name },
      },
      (err) => {
        if (err) console.log('Email not sent')

        transport.close();
      });

      return res.status(201).json({ id: contact.id });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'Create contact failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { name, cpf_cnpj, email, phone, city, state, company }: ContactInterface = req.body;

      if (!id) return res.status(404).json({ message: 'Please send contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Cannot find contact' });

      const valuesToUpdate: ContactInterface = {
        name: name || contact.name,
        cpf_cnpj: cpf_cnpj || contact.cpf_cnpj,
        email: email || contact.email,
        phone: phone || contact.phone,
        city: city || contact.city,
        state: state || contact.state,
        company: company || contact.company,
      };

      await Contact.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).json({ message: 'Please send Contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Contact does not exist' });

      await Contact.softRemove(contact);

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Cannot delete Contact, try again' });
    }
  }
}

export default new ContactController();