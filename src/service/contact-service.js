class ContactService{
	getContactById(idContact){
		return contacts.find(c=> c.id == idContact);
	}
}
