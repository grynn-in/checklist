// Copyright (c) 2021, Deepak and contributors
// For license information, please see license.txt

frappe.ui.form.on('Checklist', {
	
	// 1nd function async
	refresh: function(frm) {
		// console.log (frm)
		// console.log (frm.doc)
		console.log (frm.doc.due_date, "hello from refresh")

	},

	// 2nd function async
	validate : function(frm) {
		let x = frappe.db.get_doc ("Setting","8e1eca7571").then (results => { 
			// console.log (results.length)

			if (frm.doc.description.length > results.length ) {
				frappe.throw("hello too much information!")
			}
			return results
		})
		// console.log(x , "returned value")	
	},

	// 3rd function async, event is triggered when due_date attribute is changed in the doctype
	due_date : function (frm) {
		// console.log (frm.doc.due_date)

		//changes the JS object, and refreshes the screen
		frm.set_value ("new_field", frm.doc.due_date)
		
		// this changes the JS object, but doesnt show
		// frm.doc.new_field = frm.doc.due_date
	},

	// 3rd function async, event is triggered when due_date attribute is changed in the doctype
	title  : function (frm) {
		console.log (frm.doc.title)
		// here if the title changed, i can do something with it
		// can change child tables with due date etc on all child tables 
	}
});


// child table...should I try it myself!