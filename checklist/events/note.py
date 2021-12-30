import frappe

# dont use self
def after_insert(doc, event):
    # only once, after inserting, does not execute after update
    print (event, doc.as_dict()) # converts frappe doc to python dictiionary
    frappe.msgprint ("", "hello text from the hook")
    #print (event, doc.get_name()) # converts frappe doc to python dictiionary

