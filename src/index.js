var contactService;

function updateContactList(contacts) {
	let contactList = document.querySelector("#contact-list");
	contactList.innerHTML = "";
	window.contacts.forEach(contact => {
		contactList.innerHTML += `
			<a onclick="showDetails('${contact.id}')" class="mdc-list-item demo-drawer-list-item" data-mdc-tabindex-handled="true" tabindex="-1">
				<i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>${contact.name}
			</a>
		`;
	});
}

function showDetails(contact) {
	let selectedContact = contactService.getContactById(contact);
	let contactData = document.querySelector("#contact-data");
	let htmlContent = `<div class="mdc-typography--headline5">${selectedContact.name}</div>`;
	if (selectedContact.phones && selectedContact.phones.length > 0) {
		htmlContent += makePhoneList(selectedContact);
	} else {
		htmlContent += getNoPhoneMessage();
	}
	htmlContent += `<button onclick="initDialogPhone(${selectedContact.id})" id="add-phone-button" class="demo-button mdc-button mdc-button--raised mdc-ripple-upgraded">
						<i class="material-icons mdc-button__icon">add</i>New phone
					</button>`;
	contactData.innerHTML = htmlContent;
}

function getNoPhoneMessage(){
	return `<div class="welcome-content">
				<img src="assets/contact.png" alt="logo">
				<p class="mdc-typography--headline5">No phones yet. Please add a new one</p>
			</div>`;
}

function makePhoneList(selectedContact) {
	let htmlContent = '<ul class="mdc-list demo-list mdc-list--two-line mdc-list--avatar-list">';
	selectedContact.phones.forEach(phone => {
		htmlContent += `<div class="mdc-list-item mdc-ripple-upgraded" style="--mdc-ripple-fg-size:360px; --mdc-ripple-fg-scale:1.7064; --mdc-ripple-fg-translate-start:60px, -148.188px; --mdc-ripple-fg-translate-end:120px, -144px;">
							<span class="mdc-list-item__graphic material-icons" aria-hidden="true">phone</span>
							<span class="mdc-list-item__text">${phone.description}
							<span class="mdc-list-item__secondary-text">${phone.number}</span>
							</span>
						</div>`;
	});
	htmlContent += "</ul>";
	return htmlContent;
}

function initDialogContact() {
	new mdc.textField.MDCTextField(document.querySelector('#name-input'));
	var dialog = new mdc.dialog.MDCDialog(document.querySelector('#dialog-contact'));
	document.querySelector("#add-button").addEventListener("click", () => {
		dialog.show();
	});
	dialog.listen("MDCDialog:accept", saveContact.bind(window));
}

function initDialogPhone(contactId) {
	let selectedContact = contactService.getContactById(contactId);
	var textFieldPhone = new mdc.textField.MDCTextField(document.querySelector('#phone-input'));
	var textFieldDescription = new mdc.textField.MDCTextField(document.querySelector('#description-input'));
	var phoneDialog = new mdc.dialog.MDCDialog(document.querySelector('#dialog-phone'));
	phoneDialog.show();
	phoneDialog.listen("MDCDialog:accept", () => {
		if (!selectedContact.phones) {
			selectedContact.phones = [];
		}
		selectedContact.phones.push({
			description: textFieldDescription.value,
			number: textFieldPhone.value
		});
		showDetails(contactId);
	});
}

function saveContact() {
	contacts.push({
		id: contacts.length + 1,
		name: document.querySelector("#name-input-item").value
	});
	updateContactList();
	document.querySelector("#name-input-item").value = "";
}

function init() {
	contactService = new ContactService();
	updateContactList(contacts);
	initDialogContact();
}
