import frappe

# dont use self
def do_update(doc, event):
    # only once, after inserting, does not execute after update
    print (event, doc.as_dict()) # converts frappe doc to python dictiionary
    #print (event, doc.get_name()) # converts frappe doc to python dictiionary

def do_validate(doc, event):
    # only once, after inserting, does not execute after update
    print (event, doc.as_dict()) # converts frappe doc to python dictiionary 
    # frappe.throw ("throw from the other side!!!")
    frappe.msgprint ("message from hooks")
