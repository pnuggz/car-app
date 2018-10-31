<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mdl_carapp extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function get_makes() {
        $query = $this->db->query('SELECT * FROM `users`');
        return $query;
    }

    function get_models() {
        $query = $this->db->query('SELECT * FROM carsales_models');
        return $query;
    }

    function get_locations() {
        $query = $this->db->query('
        SELECT *
        FROM carsales_locations
        ');
        return $query;
    }

    function get_league_id($update_id){
        $query = $this->db->query('
        SELECT
        leagues.id as leagues_id,
        leagues.league_name
        FROM `contests_has_sports_events`
        INNER JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
        INNER JOIN leagues ON sports_events.leagues_id = leagues.id
        WHERE contests_has_sports_events.contests_id = ' .$update_id. '
        LIMIT 1
        ');
        return $query;
    }

    function get_contest_games($update_id) {
        $query = $this->db->query('
        SELECT
        contests_has_sports_events.contests_id,
        contests_has_sports_events.sports_events_id as contests_has_sports_events_sports_events_id,
        teams_home.team_name as team_name_home,
        teams_away.team_name as team_name_away,
        sports_events.start_date,
        sports_events.start_time
        FROM `contests_has_sports_events`
        INNER JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
        INNER JOIN teams as teams_home ON sports_events.home_team_phase_id = teams_home.id
        INNER JOIN teams as teams_away ON sports_events.away_team_phase_id = teams_away.id
        WHERE contests_has_sports_events.contests_id = ' .$update_id. '
        ORDER BY sports_events.start_date, sports_events.start_time, sports_events.id
        ');
        return $query;
    }

    function get_contest_status($league_id, $active = TRUE) {
        $table = $this->get_table();
        $this->db->select('
                                  contests.id as contests_id,
                                  contests.leagues_id,
                                  contests.contest_name,
                                  contests.start_date,
                                  contests.start_time,
                                  contests.entry_max,
                                  contests.sponsors_id,
                                  contests.contest_status,
                                  leagues.id as leagues_id,
                                  leagues.league_name,
                                  leagues.league_shorthand,
                                  ');
        $this->db->join('leagues', 'contests.leagues_id = leagues.id', 'inner');
        $this->db->where('leagues.id', $league_id);
        $this->db->order_by('start_date');
        $this->db->order_by('start_time');
        if($active == TRUE) {
            $this->db->where('contests.contest_status',0);
        } else {
            $this->db->where('contests.contest_status',1);
        }
        $query = $this->db->get($table);
        if($query->num_rows() < 1) {
            return FALSE;
        }
        return $query;
    }

    function get_details_where ($id) {
        $table = $this->get_table();
        $this->db->select('
        contests.id as contests_id,
        contests.leagues_id,
        contests.contest_name,
        contests.start_date,
        contests.start_time,
        contests.entry_max,
        contests.guarantee_type_id,
        contests.multi_type_id,
        contests.contests_prizes_id,
        contests.sponsors_id,
        contests.contest_status,
        leagues.id as leagues_id,
        leagues.league_name,
        ');
        $this->db->join('leagues', 'contests.leagues_id = leagues.id', 'inner');
        $this->db->where('contests.id', $id);
        $query = $this->db->get($table);
        return $query;
    }

    function get_sports_events_home($update_id) {
        $query = $this->db->query('
        SELECT contests_has_sports_events.contests_id, contests_has_sports_events.sports_events_id as contests_has_sports_events_sports_events_id_home, sports_events.home_team_phase_id, teams_phases.stadium_name, teams.team_name as home_team_name, sports_events.start_date, sports_events.start_time, sports_events.event_status, sports_events.id as sports_events_id
        FROM `contests_has_sports_events`
        LEFT JOIN contests ON contests_has_sports_events.contests_id = contests.id
        RIGHT JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
        INNER JOIN teams_phases ON sports_events.home_team_phase_id = teams_phases.id
        INNER JOIN teams ON teams_phases.teams_id = teams.id
        WHERE contests.id = '.$update_id.'
        ORDER BY sports_events.start_date, sports_events.start_time, sports_events.id
        ');
        return $query;
    }

    function get_sports_events_away($update_id) {
        $query = $this->db->query('
        SELECT contests_has_sports_events.contests_id, contests_has_sports_events.sports_events_id as contests_has_sports_events_sports_events_id_away, sports_events.away_team_phase_id, teams.team_name as away_team_name, sports_events.start_date, sports_events.start_time, sports_events.event_status, sports_events.id as sports_events_id
        FROM `contests_has_sports_events`
        LEFT JOIN contests ON contests_has_sports_events.contests_id = contests.id
        RIGHT JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
        INNER JOIN teams_phases ON sports_events.away_team_phase_id = teams_phases.id
        INNER JOIN teams ON teams_phases.teams_id = teams.id
        WHERE contests.id = '.$update_id.'
        ORDER BY sports_events.start_date, sports_events.start_time, sports_events.id
        ');
        return $query;
    }

    function _transactions_new_contest($data1, $data2){
        $this->db->trans_start();
        $this->db->insert('contests', $data1);
        $contest_id = $this->db->query('SELECT contests.id FROM contests ORDER BY contests.id DESC limit 1');
        foreach ($contest_id->result() as $row) {
            $contest_result_id = $row->id;
            foreach($data2 as $value){
            $this->db->query('INSERT INTO contests_has_sports_events (contests_id, sports_events_id) VALUES (' . $contest_result_id . ', ' . $value . ')');
        } }
        $this->db->trans_complete();
    }

    function make_inactive($id) {
        $table = $this->get_table();
        $this->db->set('contest_status',1);
        $this->db->where('id', $id);
        $this->db->update($table);
        return TRUE;
    }

    function make_active($id) {
        $table = $this->get_table();
        $this->db->set('contest_status',0);
        $this->db->where('id', $id);
        $this->db->update($table);
        return TRUE;
    }

    function get_events($contest_id) {
        $query = $this->db->query('
        SELECT
        sports_events.home_team_phase_id as team_id_home,
        sports_events.away_team_phase_id as team_id_away,
        teams_home.team_shorthand as team_name_home,
        teams_away.team_shorthand as team_name_away,
        sports_events.start_date,
        sports_events.start_time,
        teams_phases_home.stadium_name as home_ground
        FROM `contests_has_sports_events`
        JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
	JOIN teams_phases as teams_phases_home ON sports_events.home_team_phase_id = teams_phases_home.id
	JOIN teams_phases as teams_phases_away ON sports_events.away_team_phase_id = teams_phases_away.id
        JOIN teams as teams_home ON teams_phases_home.teams_id = teams_home.id
        JOIN teams as teams_away ON teams_phases_away.teams_id = teams_away.id
        WHERE contests_has_sports_events.contests_id = '.$contest_id.'
        ORDER BY sports_events.start_date, sports_events.start_time, teams_away.team_shorthand
        ');
        return $query;
    }

    function get_events_id($contest_id) {
        $query = $this->db->query('
        SELECT
          teams_phases.id as team_id_home,
          teamsphaseopp.id as team_id_away
          FROM `contests_has_sports_events`
          JOIN sports_events ON contests_has_sports_events.sports_events_id = sports_events.id
          JOIN teams teamsopp ON teamsopp.guid = sports_events.away_team_phase_id
          JOIN teams_phases teamsphaseopp ON teamsphaseopp.teams_id = teamsopp.guid
          JOIN teams ON teams.guid = sports_events.home_team_phase_id
          JOIN teams_phases ON teams_phases.teams_id = teams.guid
        WHERE contests_has_sports_events.contests_id = '.$contest_id.'
        ORDER BY sports_events.start_date, sports_events.start_time
        ');
        return $query;
    }

    function get_formula($contest_id) {
        $sport_id = $this->db->query('
        SELECT leagues.sports_id
        FROM `contests`
        JOIN leagues ON leagues.id = contests.leagues_id
        where contests.id = '.$contest_id.'
        ');
        $formula = $this->db->query('
        SELECT *
        FROM `points_formula`
        WHERE points_formula.sports_id = '.$sport_id.'
        ');
        return $formula;
    }

    function get_table() {
        $table = "contests";
        return $table;
    }

    function get($order_by) {
        $table = $this->get_table();
        $this->db->order_by($order_by);
        $query = $this->db->get($table);
        return $query;
    }

    function get_with_limit($limit, $offset, $order_by) {
        $table = $this->get_table();
        $this->db->limit($limit, $offset);
        $this->db->order_by($order_by);
        $query = $this->db->get($table);
        return $query;
    }

    function get_where ($id) {
        $table = $this->get_table();
        $this->db->where('id', $id);
        $query = $this->db->get($table);
        return $query;
    }

    function get_where_custom($col, $value) {
        $table = $this->get_table();
        $this->db->where($col,$value);
        $query = $this->db->get($table);
        return $query;
    }

    function get_where_custom_ordered($col, $value, $order_by) {
        $table = $this->get_table();
        $this->db->where($col,$value);
        $this->db->order_by($order_by);
        $query = $this->db->get($table);
        return $query;
    }

    function _insert($data) {
        $table = $this->get_table();
        $this->db->insert($table, $data);
    }

    function _insert1($data) {
        $this->db->insert('contests_has_sports_events', $data);
    }

    function _update($id, $data) {
        $table = $this->get_table();
        $this->db->where('id', $id);
        $this->db->update($table, $data);
    }

    function _delete($id) {
        $table = $this->get_table();
        $this->db->where('id', $id);
        $this->db->delete($table);
    }

    function count_where($column, $value) {
        $table = $this->get_table();
        $this->db->where($column, $value);
        $query = $this->db->get($table);
        $num_rows = $query->num_rows();
        return $num_rows;
    }

    function count_all() {
        $table = $this->get_table();
        $query = $this->db->get($table);
        $num_rows = $query->num_rows();
        return $num_rows;
    }

    function get_max() {
        $table = $this->get_table();
        $this->db->select_max('id');
        $query = $this->db->get($table);
        $row = $query->row();
        $id = $row->id;
        return $id;
    }

    function _custom_query($mysql_query) {
        $query = $this->db->query($mysql_query);
        return $query;
    }

}
