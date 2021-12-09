// Copyright (c) 2021, Deepak and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {
	// refresh: function(frm) {
	// }

	// this is a one time setup of function
	// add all the "methods" or functionality to be called here

	setup: function (frm) {
		frm.calculate_grand_total = frm => {
			// console.log (frm)
			let total = 0

			frm.doc.sales_order_items.forEach(
				(row) => {
					total = total + row.amount
				}
			)
			// set grand total 
			frm.set_value('grand_totals', total)

			// set status and priority as read_only
			// if user does not have System Manager role
			let is_allowed = frappe.user_roles.includes('System Manager');		
			frm.toggle_enable(['grand_totals'], total > 10000);
			frm.toggle_display(['grand_totals'], total < 1000);

		}

		// here you can add the methods to concatenate
		frm.concate_item_names = frm => {
			// console.log (frm)
			frm.doc.list_of_item_names = ''

			frm.doc.sales_order_items.forEach(
				(row) => {
					frm.doc.list_of_item_names = frm.doc.list_of_item_names + row.item_name + "\n"
				}
			)
			frm.refresh_field('list_of_item_names')
		}
	},

	refresh: function (frm) {

		// Custom buttons
		frm.add_custom_button('XXXXX', () => {
			// frappe.set_route('Form', frm.doc.reference_type, frm.doc.reference_name);
			
			// example
			// frappe.set_route('Form', frm.doc.doctype, "SO-2021-0001");
			
			// List of things we can do
			// call RPC
			
			// go to a new page
			// window.location.href = "https://www.google.com"

			// message pop box
			// frappe.msgprint ("hello")

			let d = new frappe.ui.Dialog({
				title: 'Enter details',
				fields: [
					{
						label: 'Date',
						fieldname: 'birth_date',
						fieldtype: 'Date'
					},
					{
						label: 'Last Name',
						fieldname: 'last_name',
						fieldtype: 'Data'
					},
					{
						label: 'Age',
						fieldname: 'age',
						fieldtype: 'Int'
					}
				],
				primary_action_label: 'Submit',
				primary_action(values) {

					// print to console
					console.log(values);

					// REST API, RPC, Etc, Etc, Business Logic, Back end or Front End
					frappe.call({
						// method: "frappe.core.doctype.user.user.get_all_roles", //dotted path to server method
						method: "checklist.checklist.doctype.sales_order.sales_order.add", //dotted path to server method
						args : values,
						callback: function(response) {
							// code snippet
							console.log (response)
						}
					})
					// closes the modal box
					d.hide();
				}
			});
			
			d.show();

		}, "Group of Button")

		frm.add_custom_button('YYYY', () => {
			frappe.set_route('Form', frm.doc.reference_type, frm.doc.reference_name);
		}, "Group of Button")
	},

	// we can define our own methods here  as well
	concate_item_names: function (frm) {
		// console.log (frm)
		frm.doc.list_of_item_names = ''

		frm.doc.sales_order_items.forEach(
			(row) => {
				frm.doc.list_of_item_names = frm.doc.list_of_item_names + row.item_name + "\n"
			}
		)
		frm.refresh_field('list_of_item_names')
	},

	delivery_date: function (frm) {

		frm.doc.sales_order_items.forEach(
			(row) => {
				row.delivery_date = frm.doc.delivery_date
			}
		)

		frm.refresh_field('sales_order_items')

		if (frm.doc.delivery_date < frappe.datetime.now_date()) {
			frappe.msgprint("Date Passed")
		}


	}
});

frappe.ui.form.on('Sales Order Items', {
	// cdt is Child DocType name i.e Quotation Item
	// cdn is the row name for e.g bbfcb8da6a
	sales_order_items_add(frm, cdt, cdn) {

		let row = locals[cdt][cdn]
		row.delivery_date = frm.doc.delivery_date
		frm.refresh_field('sales_order_items');

		// console.log (cdt, cdn, row)
		// let row = frappe.get_doc(cdt, cdn);
	},
	sales_order_items_remove(frm, cdt, cdn) {

		let row = locals[cdt][cdn]
		console.log(cdt, cdn, row)
		frm.calculate_grand_total(frm)

		// let row = frappe.get_doc(cdt, cdn);
	},
	quantity(frm, cdt, cdn) {
		// what is this doing? 
		// impute keywork in JS
		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		frm.refresh_field('sales_order_items');
		frm.calculate_grand_total(frm)
	},
	item_price(frm, cdt, cdn) {

		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		frm.refresh_field('sales_order_items');
		frm.calculate_grand_total(frm)
	},

	item_name(frm, cdt, cdn) {
		// frm.concate_item_names(frm)
		frm.trigger('concate_item_names')
	},
})

