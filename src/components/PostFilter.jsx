import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
        <MyInput 
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Search...">  
        </MyInput>
        <MySelect 
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Sorting"
          options={[
            {value: 'title', name: "Name"},
            {value: 'body', name: "Descr"},
          ]}
          >

          </MySelect>
      </div>
    );
};

export default PostFilter;