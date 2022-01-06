frappe.ready(function() {
	// bind events here
	frappe.web_form.after_load = () =>  {
		frappe.web_form.on('comments', (field, value) => {
			console.log (field, value)
			frappe.web_form.set_value ('grand_totals', 100 )
		}  );
	
	}

	//
	frappe.web_form.validate  = () => {
		let data = frappe.web_form.get_values ()
		let total = 0

		data.sales_order_items.forEach (item => {
			// console.log (item)	
			item.amount = item.quantity * item.item_price
			total = total + item.amount
		})

		frappe.web_form.set_value ('grand_totals', total )

		console.log (total)
		console.log (data)

		return true
		// frappe.throw ("")
	}
})

