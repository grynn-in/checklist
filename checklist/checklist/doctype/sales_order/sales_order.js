// Copyright (c) 2021, Deepak and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {

	// this is a one time setup of function
	refresh: function (frm) {

		// if (!cur_frm.doc.name.includes("new-sales-order")) {
		// 		frm.trigger ("custom_button")
		// }	

		// write an intro
		if (frm.doc.docstatus == 0) {
			frm.set_intro('Please set the value of description');
		}
		
		if (!frm.is_new()) {
			frm.trigger("custom_button")
		}


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
		}

		


	},

	custom_button: function (frm) {
		// Custom buttons
		frm.add_custom_button('Send Email', () => {
			// button behhaviour is  here
			// frm.change_custom_button_type('Send Email', null, 'warning');
			// frm.email_doc();
			frm.call('get_tax_amount', { throw_if_missing: true })
				.then(r => {
					if (r.message) {
						console.log (r.message)
						
						// let linked_doc = r.message;
						// do something with linked_doc
					}
				})
	})

	}

});

frappe.ui.form.on('Sales Order Items', {
	// cdt is Child DocType name i.e Quotation Item
	// cdn is the row name for e.g bbfcb8da6a
	sales_order_items_add(frm, cdt, cdn) {
		let row = locals[cdt][cdn]
		// console.log (cdt, cdn, row)
		// let row = frappe.get_doc(cdt, cdn);
	},
	sales_order_items_remove(frm, cdt, cdn) {

		let row = locals[cdt][cdn]
		// console.log (cdt, cdn, row)
		frm.calculate_grand_total(frm)

		// let row = frappe.get_doc(cdt, cdn);
	},
	quantity(frm, cdt, cdn) {
		// what is this doing? 
		// impute keywork in JS
		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		// frm.refresh_field('sales_order_items');
		frm.calculate_grand_total(frm)
	},
	item_price(frm, cdt, cdn) {
		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		// frm.refresh_field('sales_order_items');
		frm.calculate_grand_total(frm)
	},
})

