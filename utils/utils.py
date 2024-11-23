import os
import shutil
from datetime import datetime
from backend.settings import MEDIA_ROOT

def validate_files(request, field, update=False):
    """ 
    :params
    :request: request.data
    :field: key of file    
    """
    
    request = request.copy()

    if update:
        if request[field] != '' and type(request[field]) == str: request.__delitem__(field)
        elif request[field] == '': request.__setitem__(field, None)
    else:
        if type(request[field]) == str: request.__delitem__(field)        

    return request

def remove_directory(directory=''):    
    full_path = os.path.join(MEDIA_ROOT, directory)

    if os.path.exists(full_path):
        shutil.rmtree(full_path)
        return True
    else:
        return False


def format_date(date):
    date = datetime.strptime(date, '%d/%m/%Y')
    date = f"{date.year}-{date.month}-{date.day}"
    return date