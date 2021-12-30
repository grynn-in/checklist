frappe.ui.form.on('Note', {
	refresh : function (frm) {
		// your code here
		// console.log (frm.doc.expire_notification_on, "hello from note.js")
    }, 
    
    content : function (frm) {
        console.log (frm.doc, "hello from note.js")
    }
})