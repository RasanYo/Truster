from Group import Group
import json

file = "data/test.json"
group_tag = "groups"

def write_json(file_name, data, write_mode='a'):
    with open(file_name, write_mode) as f:
        json.dump(data, f, indent=4)
    f.close()
            
def read_json(file_name):
    with open(file_name, 'r') as f:
        data = json.load(f)
    f.close()
    return data   

def append_json(file_name, tag, data):
        previous_data = read_json(file_name)[tag]
        previous_data.append(data)
        
        
        new_data = {tag : previous_data}
        write_json(file_name, new_data, write_mode='w')
        
def remove_json_from(file_name, tag, data):
        previous_data = read_json(file_name)
        previous_data = previous_data[tag]
        
        data_filtered = list(filter(lambda json_data: json_data != data, previous_data))
        
        new_data = {tag : data_filtered}
        write_json(file_name, new_data, write_mode='w')
        
def filter_groups(file_name):
    data = read_json(file_name)["groups"]
    
    i = 0
    for group_1 in data:
        i = i + 1
        for group_2 in data[i:]:
            if (group_1["name"] == group_2["name"]) and (group_1["requester_email"] != group_2["requester_email"]):
                remove_json_from(file, "groups", group_2)
    
    

groupJSON1 = Group("Test Group 1", "https://www.facebook.com/", "Milan", False, "test1@email.com", "test123").toJSON()
groupJSON2 = Group("Test Group 2", "https://www.facebook.com/", "Milan", False, "test2@email.com", "test123").toJSON()
groupJSON3 = Group("Test Group 3", "https://www.facebook.com/", "Milan", False, "test3@email.com", "test123").toJSON()
groupJSON4 = Group("Test Group 1", "https://www.facebook.com/", "Milan", False, "test3@email.com", "test123").toJSON()

groups = [groupJSON1, groupJSON2, groupJSON3, groupJSON4]


#for group in groups:
#    append_json(file, "groups", group)
    
filter_groups(file)

