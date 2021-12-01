// Copyright (c) 2021, Deepak and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {
	// refresh: function(frm) {

	// }

	// this is a one time setup of function
	setup : function (frm) {
			frm.calculate_grand_total = frm =>  {
				// console.log (frm)
				let total = 0
				frm.doc.sales_order_items.forEach (
				 (row) => {
					total = total + row.amount
				 }
				)

				// set grand total 
				frm.set_value('grand_totals', total)
			}
	} 
});

frappe.ui.form.on('Sales Order Items', {
    // cdt is Child DocType name i.e Quotation Item
    // cdn is the row name for e.g bbfcb8da6a
    sales_order_items_add (frm, cdt, cdn) {
        
		let row = locals[cdt][cdn]
		console.log (cdt, cdn, row)

		// let row = frappe.get_doc(cdt, cdn);
    },
	sales_order_items_remove (frm, cdt, cdn) {
        
		let row = locals[cdt][cdn]
		console.log (cdt, cdn, row)
		frm.calculate_grand_total (frm)

		// let row = frappe.get_doc(cdt, cdn);
    },
	quantity (frm, cdt, cdn) {
        // what is this doing? 
		// impute keywork in JS
		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		frm.refresh_field('sales_order_items');
		frm.calculate_grand_total (frm)
    },
	item_price (frm, cdt, cdn) {
        
		let row = locals[cdt][cdn]
		row.amount = row.quantity * row.item_price
		frm.refresh_field('sales_order_items');
		frm.calculate_grand_total (frm)
    },
})

